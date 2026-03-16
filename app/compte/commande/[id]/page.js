'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import { useAuth } from '../../../../context/AuthContext'
import { supabase } from '../../../../lib/supabase'

const STATUS_STEPS = [
  { key: 'en_attente', label: 'En attente',     desc: 'Votre commande a été reçue, nous allons vous contacter sous 24h.', emoji: '⏳' },
  { key: 'confirmee',  label: 'Confirmée',       desc: 'Votre commande est confirmée et le paiement reçu.', emoji: '✅' },
  { key: 'preparee',   label: 'En préparation',  desc: "Votre lot est en cours de tri et d'emballage en Moselle.", emoji: '📦' },
  { key: 'expediee',   label: 'Expédiée',         desc: 'Votre colis est en route ! Livraison estimée sous 2-5 jours.', emoji: '🚚' },
  { key: 'livree',     label: 'Livrée',           desc: 'Votre commande a été livrée. Bonne revente sur Vinted !', emoji: '🎉' },
]

export default function CommandeDetail() {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [orderLoading, setOrderLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) router.push('/connexion')
  }, [user, loading, router])

  useEffect(() => {
    if (user && id) fetchOrder()
  }, [user, id])

  const fetchOrder = async () => {
    const { data } = await supabase.from('orders').select('*, order_items(*)').eq('id', id).eq('user_id', user.id).single()
    setOrder(data)
    setOrderLoading(false)
  }

  const getCurrentStep = () => {
    if (!order) return 0
    const idx = STATUS_STEPS.findIndex(s => s.key === order.status)
    return idx === -1 ? 0 : idx
  }

  if (loading || orderLoading) return (
    <main className="bg-[#f0f0f3] min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-32">
        <div className="text-center"><div className="text-4xl mb-3 animate-pulse">📦</div><p className="text-gray-500 text-sm">Chargement...</p></div>
      </div>
    </main>
  )

  if (!order) return (
    <main className="bg-[#f0f0f3] min-h-screen">
      <Navbar />
      <div className="max-w-lg mx-auto px-5 py-24 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="font-black text-2xl mb-3">Commande introuvable</h1>
        <Link href="/compte" className="inline-block bg-black text-white px-8 py-3.5 rounded-full font-bold text-sm">← Retour à mon compte</Link>
      </div>
    </main>
  )

  const currentStep = getCurrentStep()
  const isCancelled = order.status === 'annulee'
  const date = new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <main className="bg-[#f0f0f3] min-h-screen">
      <Navbar />
      <section className="bg-black text-white py-10 md:py-14 rounded-b-[24px] md:rounded-b-[40px]">
        <div className="max-w-7xl mx-auto px-5">
          <Link href="/compte" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs mb-4 transition-colors">← Mes commandes</Link>
          <h1 className="text-2xl md:text-4xl font-black mb-1">Commande #{order.id.split('-')[0].toUpperCase()}</h1>
          <p className="text-gray-400 text-sm">Passée le {date}</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-5 py-8 space-y-6">
        {!isCancelled && (
          <div className="bg-white rounded-3xl p-6 md:p-8" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
            <h2 className="font-black text-lg mb-6">Suivi de commande</h2>
            <div className="relative">
              <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-100"></div>
              <div className="absolute left-5 top-5 w-0.5 bg-blue-600 transition-all duration-500" style={{ height: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }}></div>
              <div className="space-y-6">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStep
                  const isCurrent = idx === currentStep
                  return (
                    <div key={step.key} className="relative flex items-start gap-4 pl-14">
                      <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${isDone ? 'bg-blue-600' : 'bg-gray-100'} ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}>
                        {isDone ? step.emoji : <span className="text-gray-300 text-sm">{idx + 1}</span>}
                      </div>
                      <div className={`pt-1.5 ${isDone ? '' : 'opacity-40'}`}>
                        <p className={`font-bold text-sm ${isCurrent ? 'text-blue-600' : ''}`}>{step.label}</p>
                        {isCurrent && <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
        {isCancelled && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">❌</div>
            <p className="font-bold text-red-800">Cette commande a été annulée</p>
          </div>
        )}
        <div className="bg-white rounded-3xl p-6 md:p-8" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
          <h2 className="font-black text-lg mb-4">Articles commandés</h2>
          <div className="space-y-0">
            {order.order_items?.map(item => (
              <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{item.product_emoji}</div>
                <div className="flex-1"><p className="font-semibold text-sm">{item.product_name}</p><p className="text-xs text-gray-400">Quantité : {item.quantity}</p></div>
                <span className="font-black text-base">{item.price * item.quantity}€</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <span className="font-black text-lg">Total</span>
            <span className="font-black text-2xl">{order.total_price}€</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 md:p-8" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
          <h2 className="font-black text-lg mb-4">Adresse de livraison</h2>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-bold">{order.customer_name}</p>
            <p>{order.address}</p>
            <p>{order.postal_code} {order.city}</p>
            <p>{order.country}</p>
            {order.customer_phone && <p className="text-gray-500 mt-1">{order.customer_phone}</p>}
          </div>
          {order.notes && (
            <div className="mt-4 bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-gray-700">{order.notes}</p>
            </div>
          )}
        </div>
        <div className="text-center pb-4">
          <Link href="/produits" className="inline-block bg-black text-white px-8 py-3.5 rounded-full font-black text-sm hover:bg-blue-600 transition-colors">COMMANDER D&apos;AUTRES LOTS →</Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
