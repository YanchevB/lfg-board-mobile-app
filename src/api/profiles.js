import supabase from '../lib/supabase';

// Postgres error for a malformed uuid: treat it the same as "not found"
const INVALID_ID = '22P02';

export async function getProfile(id) {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, username, created_at')
        .eq('id', id)
        .maybeSingle();

    if (error?.code === INVALID_ID) return null;
    if (error) throw error;

    return data;
}
