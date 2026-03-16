'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user)
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userObj) => {
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userObj.id)
        .single()

      if (error && error.code === 'PGRST116') {
        // Profil inexistant → on le crée
        const meta = userObj.user_metadata || {}
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({
            id: userObj.id,
            email: userObj.email || '',
            first_name: meta.first_name || '',
            last_name: meta.last_name || '',
            phone: meta.phone || '',
          })
          .select()
          .single()
        setProfile(newProfile)
      } else {
        setProfile(data)
      }
    } catch (err) {
      console.error('fetchProfile error:', err)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email, password, metadata) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: metadata.firstName || '',
          last_name: metadata.lastName || '',
          phone: metadata.phone || '',
        },
      },
    })

    if (error) return { data: null, error }

    // Si Supabase retourne un utilisateur sans identités → email déjà enregistré
    if (data?.user?.identities?.length === 0) {
      return { data: null, error: { message: 'Cet email est déjà utilisé.' } }
    }

    return { data, error: null }
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  const updateProfile = async (updates) => {
    if (!user) return { error: 'Non authentifié' }
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()
    if (!error) setProfile(data)
    return { data, error }
  }

  const resetPassword = async (email) => {
    const redirectTo = typeof window !== 'undefined'
      ? `${window.location.origin}/compte`
      : undefined
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    return { error }
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, updateProfile, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
