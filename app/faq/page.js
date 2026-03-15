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
    <main className="bg-[#f0f0f3] overflow-x-hidden">
      <Navbar />

      <section className="bg-black text-white py-12 md:py-16 rounded-b-[24px] md:rounded-b-[40px]">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-2 md:mb-3">FAQ</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Toutes les réponses à vos questions sur nos lots
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-5">
          {faqCategories.map((cat, ci) => (
            <div key={ci} className="mb-10 md:mb-12">
              <h2 className="text-lg md:text-xl font-black mb-4 md:mb-6 flex items-center gap-3">
                <span className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 text-white flex items-center justify-center text-xs md:text-sm font-bold rounded-full">
                  {ci + 1}
                </span>
                {cat.title}
              </h2>
              <div className="space-y-3 md:space-y-4">
                {cat.items.map((item, i) => {
                  const key = `${ci}-${i}`
                  return (
                    <div key={key} className="faq-item">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-50 transition-colors rounded-2xl"
                      >
                        <span className="font-semibold text-sm pr-2">{item.q}</span>
                        <span className="text-xl flex-shrink-0">{openItems[key] ? '−' : '+'}</span>
                      </button>
                      <div className={`faq-answer ${openItems[key] ? 'open' : ''}`}>
                        <p className="px-4 md:px-5 pb-4 md:pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="bg-white rounded-3xl p-6 md:p-8 text-center mt-6 md:mt-8" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Vous n&apos;avez pas trouvé votre réponse ?</h3>
            <p className="text-gray-500 text-sm mb-4 md:mb-6">Notre équipe est disponible pour répondre à toutes vos questions.</p>
            <Link href="/contact" className="inline-block bg-black text-white px-6 md:px-8 py-3 font-bold text-sm hover:bg-gray-800 transition-colors rounded-full">
              NOUS CONTACTER
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
