'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Search, Package, ShoppingBag, Users, Plus, BarChart3, X, Loader2, Command } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ products: any[], orders: any[] }>({ products: [], orders: [] })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Open on Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(p => !p)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Search when query changes
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults({ products: [], orders: [] })
      return
    }
    const timer = setTimeout(async () => {
      setLoading(true)
      const [products, orders] = await Promise.all([
        supabase.from('products').select('id, name, category, price').ilike('name', `%${query}%`).limit(5),
        supabase.from('orders').select('id, customer_name, total, status').or(`customer_name.ilike.%${query}%,id.ilike.%${query}%`).limit(5),
      ])
      setResults({ products: products.data || [], orders: orders.data || [] })
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [query, supabase])

  const navigateTo = (href: string) => {
    router.push(href)
    setOpen(false)
    setQuery('')
  }

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 text-sm text-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 hover:border-accent-forest/30 hover:bg-white transition-all w-full max-w-sm group shadow-sm shadow-gray-100/50"
      >
        <Search className="w-4 h-4 text-gray-400 group-hover:text-accent-forest transition-colors" />
        <span className="flex-grow text-left">Search anything...</span>
        <div className="flex items-center gap-1 bg-white border border-gray-200 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-gray-400 shadow-sm">
          <Command className="w-2.5 h-2.5" /> K
        </div>
      </button>

      {open && (
        <div 
          className="fixed inset-0 z-[100] bg-gray-900/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-in fade-in duration-300" 
          onClick={() => setOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-4 duration-300" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 p-6 border-b border-gray-50 bg-gray-50/30">
              <Search className="w-5 h-5 text-accent-forest" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, orders, customers..."
                className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-300 focus:outline-none text-base"
              />
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-accent-forest" />
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-300 bg-white border border-gray-200 px-1.5 py-0.5 rounded-md uppercase tracking-wider">Esc</span>
                </div>
              )}
            </div>

            <div className="max-h-[32rem] overflow-y-auto p-4 custom-scrollbar">
              {results.products.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 px-3 py-2 uppercase tracking-[0.2em]">
                    <Package className="w-3 h-3" /> Products
                  </div>
                  <div className="space-y-1">
                    {results.products.map(p => (
                      <button 
                        key={p.id} 
                        onClick={() => navigateTo(`/admin/products/${p.id}`)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gray-50 text-left transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-accent-forest group-hover:bg-white transition-colors">
                            <Package className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 group-hover:text-accent-forest transition-colors">{p.name}</div>
                            <div className="text-[11px] text-gray-400 mt-0.5 font-medium">{p.category} · Rs. {p.price?.toLocaleString()}</div>
                          </div>
                        </div>
                        <span className="text-gray-200 group-hover:text-accent-forest transition-colors">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.orders.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 px-3 py-2 uppercase tracking-[0.2em]">
                    <ShoppingBag className="w-3 h-3" /> Orders
                  </div>
                  <div className="space-y-1">
                    {results.orders.map(o => (
                      <button 
                        key={o.id} 
                        onClick={() => navigateTo(`/admin/orders/${o.id}`)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gray-50 text-left transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-accent-forest group-hover:bg-white transition-colors">
                            <ShoppingBag className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 group-hover:text-accent-forest transition-colors">Order #{o.id.slice(0,8)}</div>
                            <div className="text-[11px] text-gray-400 mt-0.5 font-medium">{o.customer_name} · Rs. {o.total?.toLocaleString()} · {o.status}</div>
                          </div>
                        </div>
                        <span className="text-gray-200 group-hover:text-accent-forest transition-colors">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.length >= 2 && results.products.length === 0 && results.orders.length === 0 && !loading && (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-dashed border-gray-200">
                    <Search className="w-6 h-6 text-gray-200" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium font-serif italic">No results found for "{query}"</p>
                </div>
              )}

              {query.length < 2 && (
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Add New Product', href: '/admin/products/add', icon: Plus },
                    { label: 'View Analytics', href: '/admin/analytics', icon: BarChart3 },
                    { label: 'Manage Customers', href: '/admin/customers', icon: Users },
                    { label: 'Order History', href: '/admin/orders', icon: ShoppingBag },
                  ].map(item => (
                    <button 
                      key={item.href}
                      onClick={() => navigateTo(item.href)}
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-gray-50 text-left transition-all group border border-transparent hover:border-gray-100"
                    >
                      <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-accent-forest transition-all">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-wider">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                  <span className="bg-white border border-gray-200 px-1 rounded shadow-sm text-gray-600">↑↓</span> to navigate
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                  <span className="bg-white border border-gray-200 px-1 rounded shadow-sm text-gray-600">Enter</span> to select
                </div>
              </div>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Zagull Quick Search</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
