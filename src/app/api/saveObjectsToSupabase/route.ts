import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  // console.log('GET request received');
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  try {
    const { searchParams } = new URL(request.url);
    const storageKey = searchParams.get('storageKey');
    
    if (!storageKey) {
      return NextResponse.json(
        { error: 'Missing storageKey parameter' },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
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
    // console.log('storageKey', storageKey);
    const response1 = await supabase.from('objects').select().match({ storage_key: storageKey })
    const response2 = await supabase.from('objects').select().match({ storage_key: alternativeKey })
    // console.log("testresponse1", response1);
    // console.log("testresponse2", response2);

    const error = response1.error || response2.error;
    const data = response1?.data?.length ? response1.data : response2.data;
    // console.log("errorerrorerror??", error);

    if (response1.error && response2.error) {
      console.error('Supabase database error:', error);
      return NextResponse.json(
        { error: response1.error?.message || response2.error?.message },
        { 
          status: 500,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }
    // console.log("testdata", data);

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No data found for the provided storage key' },
        { 
          status: 404,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }

    // console.log("data not reaching here", data);

    // Parse the content back to an object
    const content = JSON.parse(data[0].content);
    
    return NextResponse.json({ 
      success: true, 
      data: content,
      metadata: {
        created_at: data[0].created_at,
        id: data[0].id
      }
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error: any) {
    console.error('Error retrieving objects from Supabase:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
}

export async function POST(request: Request) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  try {
    const { objList, storageKey } = await request.json();

    if (!objList || !storageKey) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }
    // console.log("storageKey***********************************************************", storageKey);
    // Validate storage key format
    if (storageKey.includes('>>>')) {
      // console.log("storageKey includes >>>", storageKey);
      const [basePart, usersPart] = storageKey.split('>>>');
      const users = usersPart.split(',');
      
      // const validateion = users.every((user: string) => /^[a-zA-Z0-9_.-]+$/.test(user))
      // console.log("validateion", users, validateion);

      // Validate each user ID contains only valid email characters 
      if (!users.every((user: string) => /^[a-zA-Z0-9_.-@]+$/.test(user))) {
        return NextResponse.json(
          { error: 'Invalid user ID format. Only letters, numbers, dots, hyphens and underscores are allowed.' },
          { 
            status: 400,
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        );
      }
    }
    // console.log("storageKey does not include >>>", storageKey);
    // Normalize the storageKey by sorting the user list
    let normalizedStorageKey = storageKey;
    let alternativeKey = null;
    
    if (storageKey.includes('>>>') && storageKey.includes(',')) {
      const [basePart, usersPart] = storageKey.split('>>>');
      const users = usersPart.split(',');
      
      // Create normalized key with sorted users
      const sortedUsers = [...users].sort().join(',');
      normalizedStorageKey = `${basePart}>>>${sortedUsers}`;
      
      // Create alternative key with reversed users
      const reversedUsers = [...users].reverse().join(',');
      alternativeKey = `${basePart}>>>${reversedUsers}`;
    }
    // console.log("normalizedStorageKey", normalizedStorageKey);
    // Check if either key exists in the database
    const response1 = await supabase.from('objects').select('id').match({ storage_key: normalizedStorageKey });
    const response2 = alternativeKey ? await supabase.from('objects').select('id').match({ storage_key: alternativeKey }) : { data: null };

    const existingRecord = response1?.data?.[0] || response2?.data?.[0];
    const existingKey = response1?.data?.[0] ? normalizedStorageKey : (response2?.data?.[0] ? alternativeKey : null);
    // console.log("existingRecord", existingRecord);
    let result;
    // console.log("existingKey", existingKey);
    if (existingRecord) {
      // Update existing record
      result = await supabase
        .from('objects')
        .update({ 
          content: JSON.stringify(objList),
          created_at: new Date().toISOString()
        })
        .match({ storage_key: existingKey });
    } else {
      // Insert new record
      result = await supabase
        .from('objects')
        .insert([
          { 
            content: JSON.stringify(objList),
            storage_key: normalizedStorageKey,
            created_at: new Date().toISOString()
          }
        ]);
    }

    if (result.error) {
      console.error('Supabase database error:', result.error);
      return NextResponse.json(
        { error: result.error.message },
        { 
          status: 500,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }

    return NextResponse.json({ success: true }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error: any) {
    console.error('Error saving objects to Supabase:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
} 