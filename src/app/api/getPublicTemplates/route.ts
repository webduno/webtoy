import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  try {
    const { data, error } = await supabase
      .from('objects')
      .select();

    if (error) {
      console.error('Supabase database error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    const creationKeys = data[0].storage_key.split('>>>')[1];
    const creationKey = creationKeys.split(',')[0];
    // Parse the content of each template
    const templates = data.map(item => ({
      id: item.id,
      name: item.name || 'Unnamed Template',
      description: item.description || 'No description available',
      content: item.content,
      created_at: item.created_at,
      created_by: creationKey
    }));
    
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