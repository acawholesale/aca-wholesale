'use client'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const sessionId = searchParams.get('session_id')
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [countdown])

  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
      <h1 style={{ fontSize: '2rem', color: '#2d6a4f', marginBottom: '12px' }}>Paiement confirmé !</h1>
      {orderId && (
        <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '8px' }}>
          Numéro de commande : <strong>{orderId}</strong>
        </p>
      )}
      <p style={{ color: '#777', marginBottom: '32px', maxWidth: '500px' }}>
        Merci pour votre commande. Vous recevrez un email de confirmation sous peu. 
        Votre colis sera expédié dès que votre commande sera traitée.
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/compte" style={{ padding: '12px 24px', background: '#2d6a4f', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          📦 Suivre ma commande
        </Link>
        <Link href="/produits" style={{ padding: '12px 24px', background: '#f0f0f0', color: '#333', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          🛍️ Continuer mes achats
        </Link>
      </div>
    </div>
  )
}

export default function PanierSuccess() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
