import { createClient } from '@supabase/supabase-js'

// Hardcode temporarily to bypass the ENV issue
const supabaseUrl = 'https://utqqeslftnzhwkcfymdj.supabase.co'
const supabaseAnonKey = 'sb_publishable_ATNOdED0_-mfii0bpR99VQ_AdyBrFJk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)