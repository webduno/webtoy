import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface ObjectRecord {
  id: number;
  content: any;
  created_at: string;
  storage_key: string;
}

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  try {
    // First, let's get the count of all records
    const { count, error: countError } = await supabase
      .from('objects')
      .select('*', { count: 'exact', head: true });

    console.log('Total count of records:', count);

    // Query only the existing columns
    const { data, error } = await supabase
      .from('objects')
      .select('id, content, created_at, storage_key');

    console.log('Query details:', {
      hasError: !!error,
      errorMessage: error?.message,
      dataLength: data?.length,
      firstItem: data?.[0],
      allData: data,
      countError: countError?.message
    });

    if (error) {
      console.error('Supabase database error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: true, data: [] },
        { status: 200 }
      );
    }

    // Parse the content of each template
    const templates = data.map((item: ObjectRecord) => {
      let created_by = 'Unknown';
      try {
        if (item.storage_key && item.storage_key.includes('>>>')) {
          const creationKeys = item.storage_key.split('>>>')[1];
          if (creationKeys && creationKeys.includes(',')) {
            created_by = creationKeys.split(',')[0];
          }
        }
      } catch (e) {
        console.error('Error parsing storage_key:', e);
      }

      return {
        id: item.id,
        name: 'Unnamed Template ' + item.id,
        description: 'No description available',
        content: item.content,
        created_at: item.created_at,
        created_by
      };
    });
    
    return NextResponse.json({ 
      success: true, 
      data: templates
    });
  } catch (error: any) {
    console.error('Error retrieving templates from Supabase:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
} 