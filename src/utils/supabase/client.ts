import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/utils/supabase/database'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabase
