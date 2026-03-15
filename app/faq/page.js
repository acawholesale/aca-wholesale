'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

const faqCategories = [
  {
    title: 'Commandes & Livraison',
    items: [
      { q: 'Quel est le délai de livraison ?', a: 'Nous expédions sous 48h. La livraison prend ensuite 2-5 jours ouvrés en France métropolitaine, et 5-10 jours pour le reste de l\'Europe.' },
      { q: 'Quels sont les frais de livraison ?', a: 'La livraison est offerte dès 500€ d\'achat. En dessous, les frais sont de 15€ pour la France et varient selon le pays pour l\'Europe.' },
      { q: 'Livrez-vous en dehors de la France ?', a: 'Oui ! Nous livrons dans toute l\'Europe : Belgique, Suisse, Espagne, Italie, Allemagne, etc.' },
      { q: 'Comment suivre ma commande ?', a: 'Un numéro de suivi vous est envoyé par email dès l\'expédition de votre colis.' },
    ]
  },
  {
    title: 'Nos Ballots',
    items: [
      { q: 'Comment sont composés les ballots ?', a: 'Chaque ballot est composé manuellement par notre équipe. Nous sélectionnons uniquement des pièces de qualité, en bon état, de marques authentiques.' },
      { q: 'Puis-je choisir les tailles ?', a: 'Oui ! Lors de votre commande, vous pouvez indiquer vos préférences de tailles (S/M/L/XL) et nous ferons notre maximum pour les respecter.' },
      { q: 'Les vêtements sont-ils authentiques ?', a: 'Absolument. Nous garantissons 100% d\'authenticité sur toutes les pièces. Chaque article est vérifié par notre équipe.' },
      { q: 'Quel est l\'état des vêtements ?', a: 'Nos ballots contiennent des pièces en très bon état à excellent état. Les pièces abîmées ou tachées sont systématiquement écartées.' },
    ]
  },
  {
    title: 'Paiement & Retours',
    items: [
      { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et le virement bancaire.' },
      { q: 'Proposez-vous des retours ?', a: 'Nous offrons un échange ou un avoir sous 14 jours si le ballot ne correspond pas à sa description. Les frais de retour sont à la charge du client.' },
      { q: 'Y a-t-il un minimum de commande ?', a: 'Non, vous pouvez commander à partir d\'un seul ballot. Des réductions progressives sont appliquées dès 3 ballots commandés.' },
      { q: 'Proposez-vous le paiement en plusieurs fois ?', a: 'Oui, nous proposons le paiement en 3x sans frais pour les commandes supérieures à 300€.' },
    ]
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState({})

  const toggle = (key) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <main>
      <Navbar />

      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-3">FAQ</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Toutes les réponses à vos questions
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          {faqCategories.map((cat, ci) => (
            <div key={ci} className="mb-12">
              <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {ci + 1}
                </span>
                {cat.title}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item, i) => {
                  const key = `${ci}-${i}`
                  return (
                    <div key={key} className="bg-white border">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-sm">{item.q}</span>
                        <span className="text-xl ml-4 flex-shrink-0">{openItems[key] ? '−' : '+'}</span>
                      </button>
                      <div className={`faq-answer ${openItems[key] ? 'open' : ''}`}>
                        <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="bg-white border p-8 text-center mt-8">
            <h3 className="text-xl font-bold mb-3">Vous n&apos;avez pas trouvé votre réponse ?</h3>
            <p className="text-gray-500 text-sm mb-6">Notre équipe est disponible pour répondre à toutes vos questions.</p>
            <Link href="/contact" className="inline-block bg-black text-white px-8 py-3 font-bold text-sm hover:bg-gray-800 transition-colors">
              NOUS CONTACTER
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
