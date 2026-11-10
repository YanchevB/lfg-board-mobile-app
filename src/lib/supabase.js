import { createClient } from '@supabase/supabase-js';

// Session storage for logins is set up together with AuthContext (Leg 2)
const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export default supabase;
