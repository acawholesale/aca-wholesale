'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main>
      <Navbar />

      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-3">CONTACTEZ-NOUS</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Une question ? Un devis personnalisé ? Notre équipe vous répond sous 24h.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white border p-6">
                <div className="text-2xl mb-3">📧</div>
                <h3 className="font-bold text-sm mb-1">Email</h3>
                <p className="text-gray-500 text-sm">contact@aca-wholesale.com</p>
              </div>
              <div className="bg-white border p-6">
                <div className="text-2xl mb-3">📱</div>
                <h3 className="font-bold text-sm mb-1">Téléphone</h3>
                <p className="text-gray-500 text-sm">+33 6 00 00 00 00</p>
              </div>
              <div className="bg-white border p-6">
                <div className="text-2xl mb-3">💬</div>
                <h3 className="font-bold text-sm mb-1">Instagram</h3>
                <p className="text-gray-500 text-sm">@aca.wholesale</p>
              </div>
              <div className="bg-white border p-6">
                <div className="text-2xl mb-3">⏰</div>
                <h3 className="font-bold text-sm mb-1">Horaires</h3>
                <p className="text-gray-500 text-sm">Lun-Ven : 9h-18h<br/>Sam : 10h-16h</p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2 bg-white border p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-3">Message envoyé !</h3>
                  <p className="text-gray-500">Nous vous répondrons sous 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mb-6">Envoyez-nous un message</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Prénom</label>
                      <input type="text" required className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black" placeholder="Votre prénom" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nom</label>
                      <input type="text" required className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black" placeholder="Votre nom" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                    <input type="email" required className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black" placeholder="votre@email.com" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sujet</label>
                    <select className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black bg-white">
                      <option>Demande d&apos;information</option>
                      <option>Devis personnalisé</option>
                      <option>Suivi de commande</option>
                      <option>Retour / Échange</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                    <textarea required rows={5} className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black resize-none" placeholder="Décrivez votre demande..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-black text-white py-3 font-bold text-sm hover:bg-gray-800 transition-colors">
                    ENVOYER LE MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
