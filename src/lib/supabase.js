import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.EXPO_AUTH_URL, import.meta.env.EXPO_API_KEY);

export default supabase;