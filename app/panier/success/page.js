'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export default function PanierSuccess() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '.' : d + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <main style={{ background:'#080808', minHeight:'100vh' }}>
      <Navbar />
      <div style={{ maxWidth:'560px', margin:'0 auto', padding:'80px 20px' }}>
        <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'48px 32px', textAlign:'center' }}>
          <div style={{ fontSize:'64px', marginBottom:'20px' }}>✅</div>
          <h1 style={{ fontSize:'26px', fontWeight:900, color:'#fff', textTransform:'uppercase', marginBottom:'12px' }}>
            Paiement confirmé !
          </h1>
          <p style={{ color:'#9ca3af', fontSize:'14px', marginBottom:'8px' }}>
            Merci pour votre commande. Votre paiement a bien été reçu.
          </p>

          {orderId && (
            <div style={{ background:'rgba(196,150,42,0.08)', border:'1px solid rgba(196,150,42,0.3)', borderRadius:'8px', padding:'16px', margin:'24px 0', textAlign:'left' }}>
              <p style={{ fontSize:'11px', fontWeight:900, color:'#C4962A', textTransform:'uppercase', marginBottom:'6px' }}>
                📦 Référence commande
              </p>
              <p style={{ fontSize:'18px', fontWeight:900, color:'#fff', fontFamily:'monospace' }}>
                {orderId}
              </p>
            </div>
          )}

          <div style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:'8px', padding:'16px', marginBottom:'28px', textAlign:'left' }}>
            <p style={{ fontSize:'11px', fontWeight:900, color:'#22c55e', textTransform:'uppercase', marginBottom:'8px' }}>
              🚚 Expédition automatique
            </p>
            <p style={{ fontSize:'13px', color:'#9ca3af', lineHeight:1.6 }}>
              Notre système prépare automatiquement votre étiquette GLS. 
              Votre colis sera expédié depuis notre entrepôt en Moselle sous 24-48h.
            </p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            <Link href="/compte" style={{ display:'block', background:'linear-gradient(135deg,#C4962A,#E8B84B)', color:'#000', padding:'16px', fontWeight:900, fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.1em', borderRadius:'4px', textDecoration:'none' }}>
              📦 Suivre ma commande →
            </Link>
            <Link href="/produits" style={{ display:'block', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', padding:'14px', fontWeight:700, fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', borderRadius:'4px', textDecoration:'none' }}>
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
