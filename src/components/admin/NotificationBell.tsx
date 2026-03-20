'use client'

import { useState, useEffect, useRef } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Bell, CheckCircle2, MessageSquare, ShoppingBag, UserPlus, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchNotifications()
    
    // Subscribe to new notifications
    const channel = supabase
      .channel('admin_notifications_changes')
      .on('postgres_changes', { event: 'INSERT', table: 'admin_notifications', schema: 'public' }, () => {
        fetchNotifications()
      })
      .subscribe()

    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    
    return () => {
      document.removeEventListener('mousedown', handler)
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from('admin_notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (data) {
      setNotifications(data)
      setUnreadCount(data.filter(n => !n.is_read).length)
    }
  }

  const markAllRead = async () => {
    await supabase.from('admin_notifications').update({ is_read: true }).eq('is_read', false)
    setUnreadCount(0)
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'new_order': return <ShoppingBag className="w-4 h-4 text-emerald-500" />
      case 'new_message': return <MessageSquare className="w-4 h-4 text-blue-500" />
      case 'new_subscriber': return <UserPlus className="w-4 h-4 text-amber-500" />
      case 'low_stock': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(p => !p)}
        className="relative p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all active:scale-95"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between p-5 border-b border-gray-50">
            <h3 className="font-bold text-sm text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllRead} 
                className="text-[10px] font-bold text-accent-forest hover:underline uppercase tracking-wider"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[28rem] overflow-y-auto divide-y divide-gray-50 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-10 text-center space-y-3">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                  <Bell className="w-5 h-5 text-gray-300" />
                </div>
                <p className="text-xs text-gray-400 font-medium">All caught up!</p>
              </div>
            ) : (
              notifications.map(n => (
                <div 
                  key={n.id} 
                  className={cn(
                    "p-4 hover:bg-gray-50/50 transition-colors cursor-pointer group relative",
                    !n.is_read && "bg-accent-forest/[0.02]"
                  )}
                >
                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors border border-gray-100/50">
                        {getIcon(n.type)}
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn("text-xs leading-tight mb-1", !n.is_read ? "font-bold text-gray-900" : "font-medium text-gray-600")}>
                          {n.title}
                        </p>
                        {!n.is_read && <span className="w-1.5 h-1.5 rounded-full bg-accent-forest flex-shrink-0 mt-1" />}
                      </div>
                      <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">{n.message}</p>
                      <p className="text-[9px] text-gray-300 mt-2 font-medium uppercase tracking-wider">
                        {new Date(n.created_at).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 bg-gray-50/50 border-t border-gray-50">
            <button className="w-full py-2 text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-[0.2em]">
              View All Activity
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
