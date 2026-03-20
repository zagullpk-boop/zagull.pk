import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select('order_number, created_at, total_amount, status, shipping_address')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Generate CSV
    const headers = ['Order Number', 'Date', 'Customer', 'Total (PKR)', 'Status']
    const rows = orders.map(o => [
      o.order_number,
      new Date(o.created_at).toLocaleDateString(),
      o.shipping_address?.fullName || 'Guest',
      o.total_amount,
      o.status
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n')

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="zagull-sales-report-${new Date().toISOString().split('T')[0]}.csv"`
      }
    })
  } catch (error) {
    console.error('Report generation failed:', error)
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}
