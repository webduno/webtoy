import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Ensure the route is always dynamic
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface ObjectRecord {
  id: number;
  content: any;
  created_at: string;
  storage_key: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '8');
  const offset = parseInt(searchParams.get('offset') || '0');

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  try {
    // First, let's get the count of all records
    const { count, error: countError } = await supabase
      .from('objects')
      .select('*', { count: 'exact', head: true });

    // console.log('Total count of records:', count);

    // Query with pagination
    const { data, error } = await supabase
      .from('objects')
      .select('id, content, created_at, storage_key')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // console.log('Query details:', {
    //   hasError: !!error,
    //   errorMessage: error?.message,
    //   dataLength: data?.length,
    //   limit,
    //   offset,
    //   countError: countError?.message
    // });

    if (error) {
      console.error('Supabase database error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: true, data: [], hasMore: false },
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
            created_by = creationKeys.split(',')[1];
          }
        }
      } catch (e) {
        console.error('Error parsing storage_key:', e);
      }
      const parsedCreatedBy = created_by.split('@')[0];

      return {
        id: item.id,
        name: 'Unnamed Template ' + item.id,
        description: 'No description available',
        content: item.content,
        created_at: item.created_at,
        created_by: parsedCreatedBy
      };
    });
    
    return NextResponse.json({ 
      success: true, 
      data: templates,
      hasMore: count ? offset + limit < count : false
    });
  } catch (error: any) {
    console.error('Error retrieving templates from Supabase:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
} 