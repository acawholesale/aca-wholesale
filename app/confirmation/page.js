'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ConfirmationPage() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    // Récupère le récapitulatif depuis sessionStorage (défini lors de la soumission du devis)
    try {
      const raw = sessionStorage.getItem('aca_last_order')
      if (raw) setOrder(JSON.parse(raw))
    } catch {}
  }, [])

  const total = order?.products?.reduce(
    (sum, p) => sum + (p.price || 0) * (p.quantity || 1),
    0
  ) ?? 0

  return (
    <main className="min-h-screen bg-black text-white pt-[108px] md:pt-[116px] px-4 pb-20">
      <div className="max-w-2xl mx-auto">

        {/* En-tête */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-2">Devis envoyé !</h1>
          <p className="text-white/60">
            Nous avons bien reçu votre demande. Notre équipe vous contactera sous 24h.
          </p>
        </div>

        {/* Récapitulatif commande */}
        {order ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold mb-4 text-white/80">Récapitulatif de votre devis</h2>

            {/* Infos client */}
            <div className="mb-6 space-y-1 text-sm text-white/60">
              {order.email && <p>📧 {order.email}</p>}
              {order.company && <p>🏢 {order.company}</p>}
              {order.phone && <p>📞 {order.phone}</p>}
            </div>

            {/* Articles */}
            <div className="space-y-3 mb-6">
              {order.products?.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-sm">{p.name}</p>
                    {p.description && (
                      <p className="text-xs text-white/50">{p.description}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-bold">{p.quantity} × {p.price}€</p>
                    <p className="text-xs text-white/50">{(p.price * p.quantity).toFixed(0)}€</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2 text-lg font-bold">
              <span>Total estimé</span>
              <span className="text-white">{total.toFixed(0)}€</span>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-center text-white/50">
            <p>Récapitulatif non disponible.</p>
          </div>
        )}

        {/* Prochaines étapes */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-4 text-white/80">Prochaines étapes</h2>
          <ol className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3">
              <span className="text-white font-bold shrink-0">1.</span>
              Notre équipe examine votre devis et vérifie les disponibilités.
            </li>
            <li className="flex gap-3">
              <span className="text-white font-bold shrink-0">2.</span>
              Vous recevez une confirmation par email sous 24h avec les modalités de paiement.
            </li>
            <li className="flex gap-3">
              <span className="text-white font-bold shrink-0">3.</span>
              Expédition depuis la Moselle sous 48h après validation du paiement.
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/produits"
            className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition"
          >
            Continuer mes achats
          </Link>
          <Link
            href="/"
            className="border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:border-white/50 transition"
          >
            Accueil
          </Link>
        </div>

      </div>
    </main>
  )
}
