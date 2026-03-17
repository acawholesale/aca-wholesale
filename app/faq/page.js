'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

const faqCategories = [
  {
    title: 'Commandes & Livraison',
    items: [
      { q: 'Quel est le délai de livraison ?', a: 'Nous expédions rapidement depuis la Moselle. La livraison prend ensuite 2-5 jours ouvrés en France métropolitaine.' },
      { q: 'Quels sont les frais de livraison ?', a: 'Les frais de livraison varient selon le poids du colis et la destination. Contactez-nous pour un devis précis.' },
      { q: 'Livrez-vous en dehors de la France ?', a: 'Oui ! Nous livrons dans toute l\'Europe : Belgique, Suisse, Luxembourg, Allemagne, etc.' },
      { q: 'Comment suivre ma commande ?', a: 'Un numéro de suivi vous est envoyé par email dès l\'expédition de votre colis.' },
    ]
  },
  {
    title: 'Nos Lots',
    items: [
      { q: 'Comment sont composés les lots ?', a: 'Chaque lot est sélectionné avec soin par notre équipe. Nous choisissons uniquement des pièces de qualité, en bon état, de marques authentiques, avec un réel potentiel de revente.' },
      { q: 'Puis-je choisir les tailles ?', a: 'Oui ! Lors de votre commande, vous pouvez indiquer vos préférences de tailles (S/M/L/XL) et nous ferons notre maximum pour les respecter.' },
      { q: 'Les vêtements sont-ils authentiques ?', a: 'Absolument. Nous garantissons 100% d\'authenticité sur toutes les pièces. Chaque article est vérifié par notre équipe.' },
      { q: 'Quel est l\'état des vêtements ?', a: 'Nos lots contiennent des pièces en très bon état à excellent état. Les pièces abîmées ou tachées sont systématiquement écartées lors de notre tri.' },
      { q: 'Les lots sont-ils adaptés pour Vinted ?', a: 'Absolument ! Nos lots sont pensés pour les revendeurs Vinted. Chaque pièce est sélectionnée pour son potentiel de revente à la pièce.' },
    ]
  },
  {
    title: 'Paiement & Retours',
    items: [
      { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et le virement bancaire.' },
      { q: 'Proposez-vous des retours ?', a: 'Nous offrons un échange ou un avoir sous 14 jours si le lot ne correspond pas à sa description.' },
      { q: 'Y a-t-il un minimum de commande ?', a: 'Non, vous pouvez commander à partir d\'un seul lot. Des réductions progressives sont appliquées dès 3 lots commandés.' },
    ],
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState({})

  const toggle = (key) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <main className="bg-transparent overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <section className="py-12 md:py-20 border-b border-white/10" style={{ background: 'rgba(0,0,0,0.4)' }}>
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-3 text-white uppercase tracking-widest">FAQ</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Toutes les réponses à vos questions sur nos lots
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-5">
          {faqCategories.map((cat, ci) => (
            <div key={ci} className="mb-10 md:mb-12 fade-up">
              <h2 className="text-lg md:text-xl font-black mb-4 md:mb-6 flex items-center gap-3 uppercase tracking-wide">
                <span className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold rounded-full text-black flex-shrink-0" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                  {ci + 1}
                </span>
                <span style={{ color: '#E8B84B' }}>{cat.title}</span>
              </h2>
              <div className="space-y-3 md:space-y-4">
                {cat.items.map((item, i) => {
                  const key = `${ci}-${i}`
                  const isOpen = openItems[key]
                  return (
                    <div key={key} className={`faq-item ${isOpen ? 'open-item' : ''}`}>
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                      >
                        <span className="font-semibold text-sm pr-4 text-white">{item.q}</span>
                        <span className="text-xl flex-shrink-0 font-light" style={{ color: '#C4962A', transition: 'transform 0.3s ease', display: 'inline-block', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                      </button>
                      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                        <div className="px-4 md:px-5 pb-4 md:pb-5 border-t" style={{ borderColor: 'rgba(196,150,42,0.2)' }}>
                          <p className="pt-4 text-gray-300 text-sm leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="rounded-2xl p-6 md:p-8 text-center mt-6 md:mt-8 border border-white/10 fade-up" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">Vous n&apos;avez pas trouvé votre réponse ?</h3>
            <p className="text-gray-400 text-sm mb-5 md:mb-6">Notre équipe est disponible pour répondre à toutes vos questions.</p>
            <Link href="/contact" className="inline-block px-8 py-3 font-bold text-sm text-black rounded-full hover:opacity-90 transition-opacity uppercase tracking-widest" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
