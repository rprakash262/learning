import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

export const apiClient = createClient(SUPABASE_URL, SUPABASE_KEY)

export const getSupabaseDetails = () =>  ({SUPABASE_URL, SUPABASE_KEY})
