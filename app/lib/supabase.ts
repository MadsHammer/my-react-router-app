import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,    // Gemmer dit login i browserens hukommelse (LocalStorage)
    autoRefreshToken: true,  // Fornyer automatisk din adgang, så du ikke bliver logget ud midt i det hele
    detectSessionInUrl: true // Hjælper Supabase med at finde din session efter redirect
  }
});