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
    <main className="bg-[#f0f0f3] overflow-x-hidden">
      <Navbar />

      <section className="bg-black text-white py-12 md:py-16 rounded-b-[24px] md:rounded-b-[40px]">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-2 md:mb-3">CONTACTEZ-NOUS</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Une question ? Notre équipe basée en Moselle vous répond rapidement.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {/* Contact Info - horizontal scroll on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-6">
              {[
                { emoji: '📧', title: 'Email', info: 'contact@aca-wholesale.com' },
                { emoji: '💬', title: 'Instagram', info: '@aca.wholesale' },
                { emoji: '📍', title: 'Localisation', info: 'Moselle, France' },
                { emoji: '⏰', title: 'Horaires', info: 'Lun-Ven : 9h-18h\nSam : 10h-16h' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-4 md:p-6" style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -6px -6px 14px rgba(255,255,255,0.8)' }}>
                  <div className="text-xl md:text-2xl mb-2 md:mb-3">{item.emoji}</div>
                  <h3 className="font-bold text-xs md:text-sm mb-0.5 md:mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-[10px] md:text-sm whitespace-pre-line">{item.info}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 md:p-8" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
              {sent ? (
                <div className="text-center py-10 md:py-12">
                  <div className="text-4xl md:text-5xl mb-4">✅</div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Message envoyé !</h3>
                  <p className="text-gray-500 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-6">Envoyez-nous un message</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                    <div>
                      <label className="block text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 md:mb-2">Prénom</label>
                      <input type="text" required className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="Votre prénom" />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 md:mb-2">Nom</label>
                      <input type="text" required className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="Votre nom" />
                    </div>
                  </div>
                  <div className="mb-3 md:mb-4">
                    <label className="block text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 md:mb-2">Email</label>
                    <input type="email" required className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="votre@email.com" />
                  </div>
                  <div className="mb-3 md:mb-4">
                    <label className="block text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 md:mb-2">Sujet</label>
                    <select className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black bg-white rounded-xl">
                      <option>Demande d&apos;information</option>
                      <option>Devis personnalisé</option>
                      <option>Suivi de commande</option>
                      <option>Retour / Échange</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div className="mb-4 md:mb-6">
                    <label className="block text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 md:mb-2">Message</label>
                    <textarea required rows={4} className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black resize-none rounded-xl" placeholder="Décrivez votre demande..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-black text-white py-3.5 font-bold text-sm hover:bg-gray-800 transition-colors rounded-full active:bg-gray-900">
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
