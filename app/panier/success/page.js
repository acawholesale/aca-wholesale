'use client'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { useCart } from '../../../context/CartContext'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCart()
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Clear cart on successful payment
  useEffect(() => {
    clearCart()
    try { sessionStorage.removeItem('aca_checkout_cart') } catch {}
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Try to recover order data from checkout session or reservation
  useEffect(() => {
    if (!sessionId) { setLoading(false); return }
    // Try fetching order details from our API
    fetch('/api/orders/customer?session_id=' + encodeURIComponent(sessionId))
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.order) setOrderData(data.order)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [sessionId])

  const items = orderData?.items_json
    ? (typeof orderData.items_json === 'string' ? JSON.parse(orderData.items_json) : orderData.items_json)
    : null

  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>
        {/* Confirmation header */}
        <div style={{ background: '#111', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '16px', padding: '40px 32px', textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>✓</div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>Paiement confirmé</h1>
          {orderId && (
            <p style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 900, color: '#C4962A', letterSpacing: '0.08em', marginBottom: '12px' }}>{orderId}</p>
          )}
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6, marginBottom: 0 }}>
            Merci pour votre commande. Un email de confirmation vous a été envoyé. Votre colis sera préparé et expédié sous 24–48h.
          </p>
        </div>

        {/* Order recap */}
        {loading ? (
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '24px' }}>
            <div className="skeleton" style={{ height: '16px', width: '40%', marginBottom: '16px' }} />
            <div className="skeleton" style={{ height: '40px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '40px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '20px', width: '50%', marginTop: '16px' }} />
          </div>
        ) : items && items.length > 0 ? (
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
            <p style={{ fontSize: '11px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Récapitulatif de votre commande</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>{item.name || item.nom || 'Article'}</p>
                    <p style={{ color: '#6b7280', fontSize: '11px' }}>×{item.qty || item.qte || 1}</p>
                  </div>
                  <p style={{ color: '#fff', fontWeight: 900, fontSize: '14px' }}>
                    {((parseFloat(item.price || item.prix || 0)) * (parseInt(item.qty || item.qte || 1))).toFixed(0)}€
                  </p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', color: '#fff' }}>Total</span>
              <span style={{ fontWeight: 900, fontSize: '22px', color: '#C4962A' }}>
                {orderData?.total ? parseFloat(orderData.total).toFixed(0) : items.reduce((s, i) => s + (parseFloat(i.price || i.prix || 0)) * (parseInt(i.qty || i.qte || 1)), 0)}€
              </span>
            </div>
          </div>
        ) : null}

        {/* Next steps */}
        <div style={{ background: 'rgba(196,150,42,0.07)', border: '1px solid rgba(196,150,42,0.2)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ fontSize: '11px', fontWeight: 900, color: '#C4962A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Prochaines étapes</p>
          <ol style={{ margin: 0, paddingLeft: '18px', color: '#9ca3af', fontSize: '13px', lineHeight: 1.8 }}>
            <li>Un email de confirmation a été envoyé</li>
            <li>Votre commande sera préparée sous 24–48h</li>
            <li>Vous recevrez un email avec le numéro de suivi GLS dès l&apos;expédition</li>
          </ol>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/compte" className="btn-gold" style={{ flex: 1, textAlign: 'center', padding: '16px', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '8px', minWidth: '200px' }}>
            Suivre ma commande
          </Link>
          <Link href="/produits" style={{ flex: 1, textAlign: 'center', padding: '16px', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', textDecoration: 'none', minWidth: '200px' }}>
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function PanierSuccess() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#080808', minHeight: '100vh' }}>
        <Suspense fallback={
          <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="skeleton" style={{ width: '200px', height: '24px' }} />
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
