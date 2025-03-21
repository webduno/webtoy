import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  try {
    const { searchParams } = new URL(request.url);
    const storageKey = searchParams.get('storageKey');
    
    if (!storageKey) {
      return NextResponse.json(
        { error: 'Missing storageKey parameter' },
        { status: 400 }
      );
    }

    // Parse the storageKey to handle different user orders
    let alternativeKey = null;
    if (storageKey.includes('>>>') && storageKey.includes(',')) {
      const [basePart, usersPart] = storageKey.split('>>>');
      const users = usersPart.split(',');
      const sortedUsers = [...users].reverse().join(',');
      alternativeKey = `${basePart}>>>${sortedUsers}`;
    }

    const response1 = await supabase.from('objects').select().match({ storage_key: storageKey }).single();
    const response2 = await supabase.from('objects').select().match({ storage_key: alternativeKey }).single();

    const error = response1.error || response2.error;
    const data = response1.data || response2.data;

    if (error) {
      console.error('Supabase database error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No data found for the provided storage key' },
        { status: 404 }
      );
    }

    // Parse the content back to an object
    const content = JSON.parse(data[0].content);
    
    return NextResponse.json({ 
      success: true, 
      data: content,
      metadata: {
        created_at: data[0].created_at,
        id: data[0].id
      }
    });
  } catch (error: any) {
    console.error('Error retrieving objects from Supabase:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  try {
    const { objList, storageKey } = await request.json();

    console.log('objList', objList, storageKey);
    if (!objList || !storageKey) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Normalize the storageKey by sorting the user list
    let normalizedStorageKey = storageKey;
    if (storageKey.includes('>>>') && storageKey.includes(',')) {
      const [basePart, usersPart] = storageKey.split('>>>');
      const users = usersPart.split(',');
      const sortedUsers = [...users].sort().join(',');
      normalizedStorageKey = `${basePart}>>>${sortedUsers}`;
    }

    // Insert the data as a row in the database
    const { data, error } = await supabase
      .from('objects')
      .insert([
        { 
          content: JSON.stringify(objList),
          storage_key: normalizedStorageKey,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase database error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving objects to Supabase:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
} 