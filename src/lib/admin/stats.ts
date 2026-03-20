import { createClient } from '@supabase/supabase-js'

const getAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
};

export async function getDashboardStats() {
  const supabaseAdmin = getAdminClient();
  if (!supabaseAdmin) throw new Error('Supabase Admin client not initialized');

  const now = new Date()
  const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  // 1. Fetch Revenue
  const { data: currentMonthOrders } = await supabaseAdmin
    .from('orders')
    .select('total_amount, created_at')
    .gte('created_at', firstDayCurrentMonth.toISOString())
    .neq('status', 'cancelled')
    .neq('status', 'draft')

  const { data: lastMonthOrders } = await supabaseAdmin
    .from('orders')
    .select('total_amount, created_at')
    .gte('created_at', firstDayLastMonth.toISOString())
    .lte('created_at', lastDayLastMonth.toISOString())
    .neq('status', 'cancelled')
    .neq('status', 'draft')

  const currentRevenue = currentMonthOrders?.reduce((acc: number, o: any) => acc + Number(o.total_amount), 0) || 0
  const lastRevenue = lastMonthOrders?.reduce((acc: number, o: any) => acc + Number(o.total_amount), 0) || 0
  
  const revenueGrowth = lastRevenue === 0 ? 100 : ((currentRevenue - lastRevenue) / lastRevenue) * 100

  // 2. Fetch Orders Count
  const currentOrderCount = currentMonthOrders?.length || 0
  const lastOrderCount = lastMonthOrders?.length || 0
  const orderGrowth = lastOrderCount === 0 ? 100 : ((currentOrderCount - lastOrderCount) / lastOrderCount) * 100

  // 3. Fetch Customers (Profiles)
  const { count: currentCustomers } = await supabaseAdmin
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', firstDayCurrentMonth.toISOString())

  const { count: lastCustomers } = await supabaseAdmin
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', firstDayLastMonth.toISOString())
    .lte('created_at', lastDayLastMonth.toISOString())

  const customerGrowth = (lastCustomers || 0) === 0 ? 100 : (((currentCustomers || 0) - (lastCustomers || 0)) / (lastCustomers || 1)) * 100

  // 4. Fetch Total Lifetime Stats
  const { data: allRevenue } = await supabaseAdmin
    .from('orders')
    .select('total_amount')
    .neq('status', 'cancelled')

  const totalRevenue = allRevenue?.reduce((acc: number, o: any) => acc + Number(o.total_amount), 0) || 0
  
  const { count: totalOrders } = await supabaseAdmin
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .neq('status', 'cancelled')

  return {
    revenue: { total: totalRevenue, monthly: currentRevenue, growth: revenueGrowth },
    orders: { total: totalOrders || 0, monthly: currentOrderCount, growth: orderGrowth },
    customers: { monthly: currentCustomers || 0, growth: customerGrowth }
  }
}

export async function getRevenueData() {
  const supabaseAdmin = getAdminClient();
  if (!supabaseAdmin) return [];

  // Fetch last 6 months for chart
  const data = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const monthName = d.toLocaleString('default', { month: 'short' })
    const start = new Date(d.getFullYear(), d.getMonth(), 1).toISOString()
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString()
    
    const { data: monthlyOrders } = await supabaseAdmin
      .from('orders')
      .select('total_amount')
      .gte('created_at', start)
      .lte('created_at', end)
      .neq('status', 'cancelled')
    
    const total = monthlyOrders?.reduce((acc: number, o: any) => acc + Number(o.total_amount), 0) || 0
    data.push({ name: monthName, revenue: total })
  }
  return data
}
