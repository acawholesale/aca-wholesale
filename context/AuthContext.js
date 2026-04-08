'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const notConfigured = { data: null, error: { message: 'Supabase non configuré. Contactez l\'administrateur.' } }

  const signUp = async (email, password, metadata = {}) => {
    if (!supabase) return notConfigured
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    })
    return { data, error }
  }

  const signIn = async (email, password) => {
    if (!supabase) return notConfigured
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
  }

  const resetPassword = async (email) => {
    if (!supabase) return notConfigured
    const redirectTo = (typeof window !== 'undefined' ? window.location.origin : '') + '/login'
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    return { data, error }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
