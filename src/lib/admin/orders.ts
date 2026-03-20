import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use service role for admin count operations to bypass RLS if needed, 
// or ensure consistent counting across all states.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function getActiveOrderCount(): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .neq('status', 'cancelled')
    .neq('status', 'draft')
  
  if (error) {
    console.error('Error fetching order count:', error)
    return 0
  }
  
  return count || 0
}
