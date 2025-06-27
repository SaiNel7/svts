// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase environment variables are missing!');
  console.error('Please create a .env file in your project root with:');
  console.error('VITE_SUPABASE_URL=your_supabase_project_url');
  console.error('VITE_SUPABASE_KEY=your_supabase_anon_key');
  console.error('You can find these values in your Supabase project dashboard.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
