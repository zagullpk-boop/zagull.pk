'use client'

import { useState, useRef, useEffect } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { LogOut, User, Settings as SettingsIcon, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminUserMenu({ initialName, initialEmail }: { initialName: string, initialEmail: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch real profile data if possible
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setEmail(session.user.email || initialEmail)
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single()
        
        if (profile?.full_name) {
          setName(profile.full_name)
        }
      }
    }
    fetchProfile()

    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [supabase, initialEmail])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-3 hover:opacity-80 transition-all p-1.5 rounded-xl hover:bg-gray-50"
      >
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-gray-900 leading-none">{name}</p>
          <p className="text-[10px] text-gray-400 mt-1 font-medium">Super Admin</p>
        </div>
        <div className="w-10 h-10 bg-accent-forest text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-accent-forest/10 transition-transform active:scale-95">
          {initials}
        </div>
        <ChevronDown className={cn("w-3 h-3 text-gray-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-5 py-4 border-b border-gray-50 mb-1">
            <div className="text-sm font-bold text-gray-900">{name}</div>
            <div className="text-[11px] text-gray-400 truncate mt-0.5">{email}</div>
          </div>
          
          <div className="px-2">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors text-left">
              <User className="w-4 h-4" />
              <span>View Profile</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors text-left">
              <SettingsIcon className="w-4 h-4" />
              <span>Admin Settings</span>
            </button>
          </div>

          <div className="mt-2 pt-2 border-t border-gray-50 px-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
