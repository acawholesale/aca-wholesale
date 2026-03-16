'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'

export default function Connexion() {
  const [tab, setTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { signIn, signUp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/compte'

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(loginForm.email, loginForm.password)
    if (error) setError('Email ou mot de passe incorrect.')
    else router.push(redirect)
    setLoading(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      setLoading(false)
      return
    }
    if (registerForm.password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.')
      setLoading(false)
      return
    }
    const { error } = await signUp(registerForm.email, registerForm.password, registerForm.firstName, registerForm.lastName)
    if (error) setError(error.message === 'User already registered' ? 'Un compte existe déjà avec cet email.' : 'Une erreur est survenue.')
    else setSuccess('Compte créé ! Vérifiez votre email pour confirmer votre inscription, puis connectez-vous.')
    setLoading(false)
  }

  return (
    <main className="bg-[#f0f0f3] min-h-screen">
      <Navbar />
      <section className="bg-black text-white py-10 md:py-14 rounded-b-[24px] md:rounded-b-[40px]">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-2xl md:text-4xl font-black mb-1">MON COMPTE</h1>
          <p className="text-gray-400 text-sm">Accédez à vos commandes et gérez votre profil</p>
        </div>
      </section>
      <div className="max-w-md mx-auto px-5 py-10 md:py-14">
        <div className="bg-white rounded-3xl p-6 md:p-8" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            <button onClick={() => { setTab('login'); setError(''); setSuccess('') }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${tab === 'login' ? 'bg-white shadow text-black' : 'text-gray-500'}`}>
              Se connecter
            </button>
            <button onClick={() => { setTab('register'); setError(''); setSuccess('') }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${tab === 'register' ? 'bg-white shadow text-black' : 'text-gray-500'}`}>
              Créer un compte
            </button>
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4">⚠️ {error}</div>}
          {success && <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl px-4 py-3 mb-4">✅ {success}</div>}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <input type="email" required value={loginForm.email}
                  onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl"
                  placeholder="votre@email.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mot de passe</label>
                <input type="password" required value={loginForm.password}
                  onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl"
                  placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-black text-white py-3.5 rounded-full font-black text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 mt-2">
                {loading ? 'Connexion...' : 'SE CONNECTER →'}
              </button>
            </form>
          )}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Prénom *</label>
                  <input type="text" required value={registerForm.firstName}
                    onChange={e => setRegisterForm(p => ({ ...p, firstName: e.target.value }))}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl"
                    placeholder="Prénom" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom *</label>
                  <input type="text" required value={registerForm.lastName}
                    onChange={e => setRegisterForm(p => ({ ...p, lastName: e.target.value }))}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl"
                    placeholder="Nom" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email *</label>
                <input type="email" required value={registerForm.email}
                  onChange={e => setRegisterForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl"
                  placeholder="votre@email.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mot de passe *</label>
                <input type="password" required value={registerForm.password}
                  onChange={e => setRegisterForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl"
                  placeholder="Minimum 6 caractères" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Confirmer le mot de passe *</label>
                <input type="password" required value={registerForm.confirmPassword}
                  onChange={e => setRegisterForm(p => ({ ...p, confirmPassword: e.target.value }))}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl"
                  placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-black text-white py-3.5 rounded-full font-black text-sm hover:bg-blue-600 transition-colors disabled:opacity-50">
                {loading ? 'Création...' : 'CRÉER MON COMPTE →'}
              </button>
            </form>
          )}
          <p className="text-xs text-gray-400 text-center mt-5">
            En créant un compte, vous acceptez nos{' '}
            <Link href="/mentions-legales" className="underline hover:text-black">conditions d&apos;utilisation</Link>.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
