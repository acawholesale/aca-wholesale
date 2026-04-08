'use client'
import { useState } from 'react'
import Link from 'next/link'

const faqItems = [
  { q: 'Quel est le délai de livraison ?', a: 'Nous expédions rapidement depuis la Moselle. La livraison prend ensuite 2-5 jours ouvrés en France métropolitaine.' },
  { q: 'Comment sont composés les lots ?', a: 'Chaque lot est sélectionné avec soin par notre équipe. Nous choisissons uniquement des pièces de qualité, en bon état, de marques authentiques, avec un réel potentiel de revente.' },
  { q: 'Puis-je choisir les tailles ?', a: 'Oui ! Lors de votre commande, vous pouvez indiquer vos préférences de tailles et nous ferons notre maximum pour les respecter.' },
  { q: 'Les lots sont-ils adaptés pour Vinted ?', a: 'Absolument ! Nos lots sont pensés pour les revendeurs Vinted. Chaque pièce est sélectionnée pour son potentiel de revente à la pièce.' },
  { q: "Y a-t-il un minimum de commande ?", a: "Non, vous pouvez commander à partir d'un seul lot. Des réductions sont appliquées dès 3 lots commandés." },
]

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <section className="py-12 md:py-20 border-b border-white/10">
      <div className="max-w-3xl mx-auto px-5">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black uppercase text-white">FAQ</h2>
          <Link href="/faq" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">
            TOUT VOIR →
          </Link>
        </div>
        <div className="space-y-2">
          {faqItems.map((item, i) => {
            const isOpen = openFaq === i
            const answerId = `faq-answer-${i}`
            const triggerId = `faq-trigger-${i}`
            return (
              <div key={i} className={`faq-item ${isOpen ? 'open-item' : ''}`}>
                <button
                  id={triggerId}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset focus-visible:rounded"
                >
                  <span className="font-bold text-sm text-white pr-4 uppercase tracking-wide">{item.q}</span>
                  <span className="text-xl flex-shrink-0 text-gold" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={`faq-answer ${isOpen ? 'open' : ''}`}
                >
                  <p className="px-4 md:px-5 pb-4 md:pb-5 text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
