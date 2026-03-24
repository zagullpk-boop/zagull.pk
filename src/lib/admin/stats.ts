"use server";

import { createClient } from '@supabase/supabase-js'

const getAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
};

export async function getDashboardStats() {
  const supabaseAdmin = getAdminClient();
  if (!supabaseAdmin) {
    return {
      revenue: { total: 0, monthly: 0, growth: 0 },
      orders: { total: 0, monthly: 0, growth: 0 },
      customers: { monthly: 0, growth: 0 }
    };
  }

  try {
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

    // 3. Fetch Customers (Profiles) - Graceful failure as this often has strict RLS
    let currentCustomers = 0;
    let lastCustomers = 0;
    try {
      const { count: curr } = await supabaseAdmin
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', firstDayCurrentMonth.toISOString())
      currentCustomers = curr || 0;

      const { count: last } = await supabaseAdmin
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', firstDayLastMonth.toISOString())
        .lte('created_at', lastDayLastMonth.toISOString())
      lastCustomers = last || 0;
    } catch (e) {
      console.warn("Could not fetch customer stats, likely RLS restriction.");
    }

    const customerGrowth = lastCustomers === 0 ? 100 : ((currentCustomers - lastCustomers) / Math.max(lastCustomers, 1)) * 100

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
  } catch (err) {
    console.error("Error in getDashboardStats:", err);
    return {
      revenue: { total: 0, monthly: 0, growth: 0 },
      orders: { total: 0, monthly: 0, growth: 0 },
      customers: { monthly: 0, growth: 0 }
    };
  }
}

export async function getRevenueData() {
  const supabaseAdmin = getAdminClient();
  if (!supabaseAdmin) return [];

  try {
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
  } catch (err) {
    console.error("Error in getRevenueData:", err);
    return [];
  }
}
