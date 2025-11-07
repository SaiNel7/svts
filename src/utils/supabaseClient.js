// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase environment variables are missing!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_KEY:', supabaseKey ? 'Present' : 'Missing');
  console.error('Please create a .env file in your project root with:');
  console.error('VITE_SUPABASE_URL=your_supabase_project_url');
  console.error('VITE_SUPABASE_KEY=your_supabase_anon_key');
  console.error('You can find these values in your Supabase project dashboard.');
}

// Create a fallback client even if env vars are missing to prevent app crash
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'placeholder-key';

export const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseKey || fallbackKey
);
