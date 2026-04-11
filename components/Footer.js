'use client'
import { useState } from 'react'
import Link from 'next/link'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // 'ok' | 'error' | 'loading'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom: 'Newsletter', nom: 'Inscription', email, sujet: 'Newsletter', message: 'Inscription newsletter depuis le footer.' }),
      })
      setStatus(res.ok ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return <p className="text-green-400 font-bold text-sm">✓ Inscription confirmée !</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
      <label htmlFor="newsletter-email" className="sr-only">Votre adresse email</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Votre adresse email"
        className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-white/30 rounded-full transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="text-black px-6 py-3 font-semibold text-sm transition-all rounded-full bg-gold-gradient focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
      >
        {status === 'loading' ? '...' : "S'inscrire"}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs mt-1 sm:mt-0 sm:self-center">Erreur, réessayez.</p>}
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="bg-black text-white rounded-t-[24px] md:rounded-t-[40px]">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-5 py-10 md:py-12 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Rejoignez la famille ACA Wholesale</h3>
          <p className="text-gray-300 mb-5 md:mb-6 text-xs md:text-sm">
            Recevez nos offres exclusives et soyez informé des nouveaux arrivages
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="ACA Wholesale"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
              Grossiste en lots de vêtements de seconde main basé en Moselle.
              Des lots sélectionnés avec soin, pensés pour les revendeurs.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-gray-800 flex items-center justify-center hover:bg-gold/20 hover:border-gold/40 border border-transparent transition-all rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded-full">
                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" aria-label="TikTok" className="w-9 h-9 bg-gray-800 flex items-center justify-center hover:bg-gold/20 hover:border-gold/40 border border-transparent transition-all rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded-full">
                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.2 8.2 0 005.58 2.17V11.7a4.83 4.83 0 01-3.58-1.46V6.69h3.58z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-gray-800 flex items-center justify-center hover:bg-gold/20 hover:border-gold/40 border border-transparent transition-all rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded-full">
                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 text-gold">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 text-xs md:text-sm hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">Accueil</Link></li>
              <li><Link href="/produits" className="text-gray-300 text-xs md:text-sm hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">Nos Lots</Link></li>
              <li><Link href="/a-propos" className="text-gray-300 text-xs md:text-sm hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">À Propos</Link></li>
              <li><Link href="/faq" className="text-gray-300 text-xs md:text-sm hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">FAQ</Link></li>
              <li><Link href="/comment-revendre" className="text-gray-300 text-xs md:text-sm hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">Comment revendre</Link></li>
              <li><Link href="/contact" className="text-gray-300 text-xs md:text-sm hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">Contact</Link></li>
            </ul>
          </div>

          {/* Compte */}
          <div>
            <h4 className="font-bold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 text-gold">
              Mon Compte
            </h4>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-gray-300 text-xs md:text-sm hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">Connexion</Link></li>
              <li><Link href="/register" className="text-gray-300 text-xs md:text-sm hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">Créer un compte</Link></li>
              <li><Link href="/compte" className="text-gray-300 text-xs md:text-sm hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">Mon espace</Link></li>
              <li><Link href="/mot-de-passe-oublie" className="text-gray-300 text-xs md:text-sm hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">Mot de passe oublié</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 text-gold">
              Contact
            </h4>
            <ul className="space-y-3 text-gray-300 text-xs md:text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                contact@aca-wholesale.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                @aca.wholesale
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Moselle, France
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Lun–Ven, 9h–18h
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-5 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-gray-400 text-[11px] md:text-xs">
          <span>© 2026 ACA Wholesale. Tous droits réservés. Basé en <span className="text-gold">Moselle, France</span>.</span>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">CGV</Link>
            <Link href="/mentions-legales" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
