'use client'

import { useState, Suspense } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.session.user.id)
        .single()

      if (profile?.role !== 'admin') {
        await supabase.auth.signOut()
        setError('You do not have admin access.')
        setLoading(false)
        return
      }

      const redirect = searchParams.get('redirect') || '/admin'
      router.push(redirect)
      router.refresh()
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 font-sans">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10 space-y-2">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-3xl font-serif tracking-widest text-gray-900">ZAGULL</span>
            <span className="text-[10px] bg-gray-900 text-white px-2.5 py-1 rounded-md font-bold tracking-tighter">ADMIN</span>
          </div>
          <p className="text-gray-400 text-sm">Authorized personnel only</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10">
          {searchParams.get('error') === 'unauthorized' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-xs font-medium mb-6 animate-in fade-in slide-in-from-top-2">
              You do not have permission to access the admin panel.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <input
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="zagull.pk@gmail.com" 
                required 
                autoComplete="email"
                className="w-full border border-gray-100 bg-gray-50/50 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/5 focus:bg-white transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required 
                  autoComplete="current-password"
                  className="w-full border border-gray-100 bg-gray-50/50 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/5 focus:bg-white transition-all placeholder:text-gray-300 pr-14"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-900 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-red-600 text-xs font-medium animate-in shake-1">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-gray-900/10 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : 'Sign In to Admin'}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-gray-300 mt-10 uppercase tracking-[0.3em] font-medium">
          Protected by Zagull Security
        </p>
      </div>
    </main>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
