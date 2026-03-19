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
      { q: 'Livrez-vous en dehors de la France ?', a: "Oui ! Nous livrons dans toute l'Europe : Belgique, Suisse, Luxembourg, Allemagne, etc." },
      { q: 'Comment suivre ma commande ?', a: "Un numéro de suivi vous est envoyé par email dès l'expédition de votre colis." },
    ]
  },
  {
    title: 'Nos Lots',
    items: [
      { q: 'Comment sont composés les lots ?', a: 'Chaque lot est sélectionné avec soin par notre équipe. Nous choisissons uniquement des pièces de qualité, en bon état, de marques authentiques, avec un réel potentiel de revente.' },
      { q: 'Puis-je choisir les tailles ?', a: 'Oui ! Lors de votre commande, vous pouvez indiquer vos préférences de tailles (S/M/L/XL) et nous ferons notre maximum pour les respecter.' },
      { q: 'Les vêtements sont-ils authentiques ?', a: "Absolument. Nous garantissons 100% d'authenticité sur toutes les pièces. Chaque article est vérifié par notre équipe." },
      { q: "Quel est l'état des vêtements ?", a: 'Nos lots contiennent des pièces en très bon état à excellent état. Les pièces abîmées ou tachées sont systématiquement écartées lors de notre tri.' },
      { q: 'Les lots sont-ils adaptés pour Vinted ?', a: 'Absolument ! Nos lots sont pensés pour les revendeurs Vinted. Chaque pièce est sélectionnée pour son potentiel de revente à la pièce.' },
    ]
  },
  {
    title: 'Paiement & Retours',
    items: [
      { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et le virement bancaire.' },
      { q: 'Proposez-vous des retours ?', a: "Nous offrons un échange ou un avoir sous 14 jours si le lot ne correspond pas à sa description." },
      { q: "Y a-t-il un minimum de commande ?", a: "Non, vous pouvez commander à partir d'un seul lot. Des réductions progressives sont appliquées dès 3 lots commandés." },
    ]
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState({})
  const toggle = (key) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />

      {/* Header */}
      <section style={{ padding: '60px 24px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
        <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>Centre d'aide</p>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 52px)', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 12px 0' }}>FAQ</h1>
        <p style={{ color: '#555', fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>Toutes les réponses à vos questions sur nos lots</p>
      </section>

      {/* FAQ Content */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px' }}>
        {faqCategories.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: '40px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#E8B84B', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 16px 0' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '12px', fontWeight: 900, flexShrink: 0 }}>
                {ci + 1}
              </span>
              {cat.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cat.items.map((item, i) => {
                const key = ci + '-' + i
                const isOpen = openItems[key]
                return (
                  <div key={key} style={{ background: '#111', border: '1px solid ' + (isOpen ? 'rgba(196,150,42,0.4)' : 'rgba(255,255,255,0.07)'), borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                    <button
                      onClick={() => toggle(key)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px' }}
                    >
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: '14px', lineHeight: '1.4' }}>{item.q}</span>
                      <span style={{ color: '#C4962A', fontSize: '22px', fontWeight: 300, flexShrink: 0, display: 'inline-block', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 20px 18px', borderTop: '1px solid rgba(196,150,42,0.2)' }}>
                        <p style={{ color: '#999', fontSize: '14px', lineHeight: '1.7', margin: '14px 0 0 0' }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{ background: 'rgba(196,150,42,0.06)', border: '1px solid rgba(196,150,42,0.2)', borderRadius: '16px', padding: '32px', textAlign: 'center', marginTop: '16px' }}>
          <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '18px', margin: '0 0 8px 0' }}>Vous n&apos;avez pas trouvé votre réponse ?</h3>
          <p style={{ color: '#555', fontSize: '13px', margin: '0 0 20px 0' }}>Notre équipe est disponible pour répondre à toutes vos questions.</p>
          <Link href="/contact" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '8px', textDecoration: 'none' }}>
            Nous contacter
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
