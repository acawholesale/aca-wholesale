'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useCart } from '../../context/CartContext'

export default function Panier() {
  const { items, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart()
  const [step, setStep] = useState('cart')
  const [form, setForm] = useState({ prenom:'',nom:'',email:'',telephone:'',adresse:'',ville:'',codePostal:'',pays:'France',activite:'',notes:'' })
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setCheckoutLoading(true)
    setCheckoutError(null)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer: form }),
      })
      const data = await res.json()
      if (data.url) {
        // Save cart to sessionStorage for recovery if Stripe fails, then redirect
        try { sessionStorage.setItem('aca_checkout_cart', JSON.stringify({ items, form })) } catch {}
        window.location.href = data.url
      } else if (data.outOfStock) {
        setCheckoutError({
          type: 'stock',
          message: 'Stock insuffisant pour certains articles :',
          details: data.outOfStock.map(i =>
            `${i.name} : ${i.available} disponible${i.available > 1 ? 's' : ''} (demandé : ${i.requested})`
          ),
        })
        setCheckoutLoading(false)
      } else {
        setCheckoutError({ type: 'payment', message: data.error || 'Une erreur est survenue lors du paiement.' })
        setCheckoutLoading(false)
      }
    } catch {
      setCheckoutError({ type: 'network', message: 'Erreur de connexion. Vérifiez votre connexion internet et réessayez.' })
      setCheckoutLoading(false)
    }
  }
  const inputStyle = { width:'100%',background:'#0d0d0d',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'4px',padding:'12px 16px',fontSize:'14px',color:'#fff',outline:'none',boxSizing:'border-box' }
  const labelStyle = { display:'block',fontSize:'10px',fontWeight:900,color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'8px' }

  if (step === 'confirm') return (
    <main id="main-content" tabIndex={-1} style={{ background:'#080808',minHeight:'100vh' }}>
      <Navbar />
      <div style={{ maxWidth:'520px',margin:'0 auto',padding:'80px 20px' }}>
        <div style={{ background:'#111',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'48px 32px',textAlign:'center' }}>
          <div style={{ fontSize:'56px',marginBottom:'20px' }}>✅</div>
          <h1 style={{ fontSize:'24px',fontWeight:900,color:'#fff',textTransform:'uppercase',marginBottom:'12px' }}>Demande envoyée !</h1>
          <p style={{ color:'#9ca3af',fontSize:'14px',marginBottom:'8px' }}>Merci <strong style={{ color:'#fff' }}>{form.prenom}</strong>, votre demande a bien été reçue.</p>
          <p style={{ color:'#6b7280',fontSize:'13px',marginBottom:'32px' }}>Notre équipe vous contactera sous 24h à <strong style={{ color:'#9ca3af' }}>{form.email}</strong>.</p>
          <div style={{ background:'rgba(196,150,42,0.08)',border:'1px solid rgba(196,150,42,0.3)',borderRadius:'8px',padding:'16px',marginBottom:'32px',textAlign:'left' }}>
            <p style={{ fontSize:'11px',fontWeight:900,color:'#C4962A',textTransform:'uppercase',marginBottom:'6px' }}>📋 Prochaine étape</p>
            <p style={{ fontSize:'12px',color:'#9ca3af',lineHeight:1.6 }}>Notre équipe en Moselle vous contactera pour confirmer les détails de votre lot et organiser l&apos;expédition.</p>
          </div>
          <Link href="/produits" style={{ display:'block',background:'linear-gradient(135deg,#C4962A,#E8B84B)',color:'#000',padding:'16px',fontWeight:900,fontSize:'13px',textTransform:'uppercase',letterSpacing:'0.1em',borderRadius:'4px',textDecoration:'none' }}>Continuer mes achats →</Link>
        </div>
      </div>
      <Footer />
    </main>
  )

  if (items.length === 0) return (
    <main style={{ background:'#080808',minHeight:'100vh' }}>
      <Navbar />
      <div style={{ maxWidth:'520px',margin:'0 auto',padding:'80px 20px' }}>
        <div style={{ background:'#111',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'48px 32px',textAlign:'center' }}>
          <div style={{ fontSize:'56px',marginBottom:'20px' }}>📋</div>
          <h1 style={{ fontSize:'20px',fontWeight:900,color:'#fff',textTransform:'uppercase',marginBottom:'12px' }}>Votre panier est vide</h1>
          <p style={{ color:'#6b7280',fontSize:'14px',marginBottom:'32px' }}>Parcourez nos lots et ajoutez-les à votre panier.</p>
          <Link href="/produits" style={{ display:'block',background:'linear-gradient(135deg,#C4962A,#E8B84B)',color:'#000',padding:'16px',fontWeight:900,fontSize:'13px',textTransform:'uppercase',letterSpacing:'0.1em',borderRadius:'4px',textDecoration:'none' }}>Voir nos lots</Link>
        </div>
      </div>
      <Footer />
    </main>
  )

  return (
    <main style={{ background:'#080808' }} className="overflow-x-hidden">
      <Navbar />
      <section style={{ borderBottom:'1px solid rgba(255,255,255,0.08)',padding:'40px 0 32px' }}>
        <div style={{ maxWidth:'1280px',margin:'0 auto',padding:'0 20px' }}>
          <p style={{ fontSize:'11px',fontWeight:900,color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:'8px' }}>ACA Wholesale</p>
          <h1 style={{ fontSize:'clamp(24px,5vw,40px)',fontWeight:900,color:'#fff',textTransform:'uppercase',marginBottom:'6px' }}>{step==='cart'?'MA DEMANDE DE DEVIS':'MES COORDONNÉES'}</h1>
          <p style={{ color:'#6b7280',fontSize:'14px' }}>{step==='cart'?`${totalItems} lot${totalItems>1?'s':''} sélectionné${totalItems>1?'s':''} — Notre équipe vous contacte sous 24h`:'Renseignez vos coordonnées pour finaliser votre demande'}</p>
        </div>
      </section>

      <div style={{ maxWidth:'1280px',margin:'0 auto',padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display:'flex',alignItems:'center',gap:'12px' }}>
          {['Sélection','Coordonnées','Confirmation'].map((s,i) => {
            const stepMap={0:'cart',1:'form',2:'confirm'};const isActive=stepMap[i]===step;const isPast=(step==='form'&&i===0)||(step==='confirm'&&i<=1)
            return (<div key={s} style={{ display:'flex',alignItems:'center',gap:'8px' }}>
              <div style={{ width:'28px',height:'28px',borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:900,background:isPast?'#16a34a':isActive?'linear-gradient(135deg,#C4962A,#E8B84B)':'rgba(255,255,255,0.05)',color:isPast?'#fff':isActive?'#000':'#6b7280' }}>{isPast?'✓':i+1}</div>
              <span style={{ fontSize:'11px',fontWeight:700,textTransform:'uppercase',color:isActive?'#fff':'#4b5563' }} className="hidden sm:inline">{s}</span>
              {i<2&&<span style={{ color:'rgba(255,255,255,0.1)' }}>—</span>}
            </div>)
          })}
        </div>
      </div>

      <section style={{ maxWidth:'1280px',margin:'0 auto',padding:'24px 20px 96px' }}>
        {step==='cart'&&(
          <div style={{ gap:'24px',alignItems:'start' }} className="cart-grid">
            <div style={{ display:'flex',flexDirection:'column',gap:'12px' }}>
              {items.map(item=>(
                <div key={item.id} style={{ background:'#111',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'16px',display:'flex',gap:'12px',alignItems:'center' }}>
                  <div style={{ width:'72px',height:'72px',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'28px',backgroundColor:item.color }}>{item.emoji}</div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <h3 style={{ fontWeight:900,fontSize:'13px',color:'#fff',textTransform:'uppercase',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginBottom:'4px' }}>{item.name}</h3>
                    <p style={{ fontSize:'12px',color:'#6b7280',marginBottom:'10px' }}>{item.description}</p>
                    <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                      <div style={{ display:'flex',alignItems:'center',gap:'4px',background:'#000',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'4px',padding:'2px' }}>
                        <button onClick={()=>updateQty(item.id,item.qty-1)} style={{ width:'28px',height:'28px',display:'flex',alignItems:'center',justifyContent:'center',color:'#9ca3af',fontWeight:700,fontSize:'16px',background:'none',border:'none',cursor:'pointer' }}>−</button>
                        <span style={{ width:'24px',textAlign:'center',fontSize:'13px',fontWeight:900,color:'#fff' }}>{item.qty}</span>
                        <button onClick={()=>updateQty(item.id,item.qty+1)} style={{ width:'28px',height:'28px',display:'flex',alignItems:'center',justifyContent:'center',color:'#9ca3af',fontWeight:700,fontSize:'16px',background:'none',border:'none',cursor:'pointer' }}>+</button>
                      </div>
                      <span style={{ fontWeight:900,fontSize:'16px',color:'#fff' }}>{item.price*item.qty}€</span>
                    </div>
                  </div>
                  <button onClick={()=>removeFromCart(item.id)} style={{ background:'none',border:'none',cursor:'pointer',color:'#4b5563',padding:'4px',flexShrink:0 }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
              <Link href="/produits" style={{ display:'block',textAlign:'center',fontSize:'12px',fontWeight:900,color:'#C4962A',textDecoration:'none',padding:'12px',textTransform:'uppercase' }}>+ Ajouter d&apos;autres lots</Link>
            </div>
            <div style={{ background:'#111',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'20px',position:'sticky',top:'80px' }} className="cart-sidebar">
              <h3 style={{ fontWeight:900,fontSize:'13px',textTransform:'uppercase',color:'#fff',marginBottom:'16px' }}>Récapitulatif</h3>
              <div style={{ display:'flex',flexDirection:'column',gap:'8px',marginBottom:'16px',paddingBottom:'16px',borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                {items.map(item=>(<div key={item.id} style={{ display:'flex',justifyContent:'space-between',fontSize:'12px' }}><span style={{ color:'#9ca3af',flex:1,marginRight:'8px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{item.name} ×{item.qty}</span><span style={{ fontWeight:700,color:'#fff',flexShrink:0 }}>{item.price*item.qty}€</span></div>))}
              </div>
              <div style={{ background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:'6px',padding:'12px',marginBottom:'16px' }}>
                <p style={{ fontSize:'10px',fontWeight:900,color:'#22c55e',textTransform:'uppercase',marginBottom:'4px' }}>💰 Potentiel de revente estimé</p>
                <p style={{ fontSize:'12px',color:'#9ca3af' }}>{items.reduce((sum,item)=>sum+(item.vinteMax||0)*(item.pieces||0)*item.qty,0)}€ max (si revendu à la pièce)</p>
              </div>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px' }}><span style={{ fontSize:'12px',color:'#6b7280',textTransform:'uppercase' }}>Sous-total</span><span style={{ fontWeight:700,color:'#fff',fontSize:'14px' }}>{totalPrice}€</span></div>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px',paddingBottom:'16px',borderBottom:'1px solid rgba(255,255,255,0.08)' }}><span style={{ fontSize:'12px',color:'#6b7280',textTransform:'uppercase' }}>Livraison</span><span style={{ fontSize:'12px',fontWeight:900,color:'#C4962A',textTransform:'uppercase' }}>À calculer</span></div>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px' }}><span style={{ fontWeight:900,fontSize:'14px',textTransform:'uppercase',color:'#fff' }}>Total estimé</span><span style={{ fontWeight:900,fontSize:'24px',color:'#fff' }}>{totalPrice}€</span></div>
              <button onClick={()=>setStep('form')} style={{ width:'100%',background:'linear-gradient(135deg,#C4962A,#E8B84B)',color:'#000',padding:'16px',fontWeight:900,fontSize:'12px',textTransform:'uppercase',letterSpacing:'0.1em',borderRadius:'4px',border:'none',cursor:'pointer' }}>ENVOYER MA DEMANDE →</button>
              <p style={{ textAlign:'center',fontSize:'11px',color:'#4b5563',textTransform:'uppercase',marginTop:'12px' }}>🔒 Réponse sous 24h</p>
            </div>
          </div>
        )}

        {step==='form'&&(
          <div style={{ gap:'24px',alignItems:'start' }} className="cart-grid">
            <form onSubmit={handleSubmit} style={{ background:'#111',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'32px' }}>
              <h2 style={{ fontSize:'14px',fontWeight:900,textTransform:'uppercase',letterSpacing:'0.06em',color:'#fff',marginBottom:'24px' }}>Vos coordonnées</h2>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px' }}>
                <div><label style={labelStyle}>Prénom *</label><input name="prenom" value={form.prenom} onChange={handleChange} required type="text" style={inputStyle} placeholder="Votre prénom"/></div>
                <div><label style={labelStyle}>Nom *</label><input name="nom" value={form.nom} onChange={handleChange} required type="text" style={inputStyle} placeholder="Votre nom"/></div>
              </div>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px' }}>
                <div><label style={labelStyle}>Email *</label><input name="email" value={form.email} onChange={handleChange} required type="email" style={inputStyle} placeholder="votre@email.com"/></div>
                <div><label style={labelStyle}>Téléphone</label><input name="telephone" value={form.telephone} onChange={handleChange} type="tel" style={inputStyle} placeholder="+33 6 00 00 00 00"/></div>
              </div>
              <div style={{ marginBottom:'16px' }}><label style={labelStyle}>Adresse *</label><input name="adresse" value={form.adresse} onChange={handleChange} required type="text" style={inputStyle} placeholder="Numéro et nom de rue"/></div>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px',marginBottom:'16px' }}>
                <div><label style={labelStyle}>Code postal *</label><input name="codePostal" value={form.codePostal} onChange={handleChange} required type="text" style={inputStyle} placeholder="57000"/></div>
                <div><label style={labelStyle}>Ville *</label><input name="ville" value={form.ville} onChange={handleChange} required type="text" style={inputStyle} placeholder="Metz"/></div>
                <div><label style={labelStyle}>Pays *</label><select name="pays" value={form.pays} onChange={handleChange} style={inputStyle}><option>France</option><option>Belgique</option><option>Suisse</option><option>Luxembourg</option><option>Autre</option></select></div>
              </div>
              <div style={{ marginBottom:'16px' }}><label style={labelStyle}>Activité de revente</label><select name="activite" value={form.activite} onChange={handleChange} style={inputStyle}><option value="">Sélectionner...</option><option>Revendeur Vinted</option><option>Revendeur Leboncoin / Facebook</option><option>Boutique en ligne</option><option>Brocante / Vide-grenier</option><option>Autre</option></select></div>
              <div style={{ marginBottom:'24px' }}><label style={labelStyle}>Préférences de tailles / Notes</label><textarea name="notes" value={form.notes} onChange={handleChange} rows={4} style={{ ...inputStyle,resize:'vertical' }} placeholder="Indiquez vos préférences de tailles, genre (homme/femme/mixte)..."></textarea></div>
              {checkoutError && (
                <div style={{ background: checkoutError.type === 'stock' ? 'rgba(251,191,36,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${checkoutError.type === 'stock' ? 'rgba(251,191,36,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                  <p style={{ color: checkoutError.type === 'stock' ? '#fbbf24' : '#ef4444', fontSize: '13px', fontWeight: 700, marginBottom: checkoutError.details ? '8px' : 0 }}>{checkoutError.message}</p>
                  {checkoutError.details && (
                    <ul style={{ margin: 0, paddingLeft: '16px' }}>
                      {checkoutError.details.map((d, i) => <li key={i} style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}>{d}</li>)}
                    </ul>
                  )}
                </div>
              )}
              <div style={{ display:'flex',gap:'12px' }}>
                <button type="button" onClick={()=>{ setStep('cart'); setCheckoutError(null) }} style={{ flex:1,border:'1px solid rgba(255,255,255,0.15)',background:'none',padding:'16px',fontWeight:900,fontSize:'12px',textTransform:'uppercase',color:'#fff',borderRadius:'4px',cursor:'pointer' }}>← Retour</button>
                <button type="submit" disabled={checkoutLoading} style={{ flex:2,background:checkoutLoading?'#6b7280':'linear-gradient(135deg,#C4962A,#E8B84B)',color:'#000',padding:'16px',fontWeight:900,fontSize:'12px',textTransform:'uppercase',letterSpacing:'0.1em',borderRadius:'4px',border:'none',cursor:checkoutLoading?'not-allowed':'pointer' }}>{checkoutLoading ? '⏳ Redirection...' : '💳 PAYER MAINTENANT →'}</button>
              </div>
              <p style={{ textAlign:'center',fontSize:'11px',color:'#4b5563',marginTop:'16px',textTransform:'uppercase' }}>Notre équipe vous contactera par email pour le paiement et l&apos;expédition.</p>
            </form>
            <div style={{ background:'#111',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'20px',position:'sticky',top:'80px' }} className="cart-sidebar">
              <h3 style={{ fontWeight:900,fontSize:'12px',textTransform:'uppercase',color:'#fff',marginBottom:'16px' }}>Votre commande</h3>
              <div style={{ display:'flex',flexDirection:'column',gap:'12px',marginBottom:'16px' }}>
                {items.map(item=>(<div key={item.id} style={{ display:'flex',alignItems:'center',gap:'10px' }}><div style={{ width:'40px',height:'40px',borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0,backgroundColor:item.color }}>{item.emoji}</div><div style={{ flex:1,minWidth:0 }}><p style={{ fontSize:'11px',fontWeight:700,color:'#fff',textTransform:'uppercase',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{item.name}</p><p style={{ fontSize:'11px',color:'#6b7280' }}>×{item.qty}</p></div><span style={{ fontSize:'13px',fontWeight:900,color:'#fff',flexShrink:0 }}>{item.price*item.qty}€</span></div>))}
              </div>
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'12px',display:'flex',justifyContent:'space-between',alignItems:'center' }}><span style={{ fontWeight:900,fontSize:'12px',textTransform:'uppercase',color:'#fff' }}>Total</span><span style={{ fontWeight:900,fontSize:'22px',color:'#fff' }}>{totalPrice}€</span></div>
            </div>
          </div>
        )}
      </section>

      <div className="md:hidden" style={{ position:'fixed',bottom:0,left:0,right:0,zIndex:50,background:'#000',borderTop:'1px solid rgba(255,255,255,0.1)',padding:'12px 16px',paddingBottom:'max(14px, env(safe-area-inset-bottom))' }}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px' }}>
          <div><p style={{ fontSize:'11px',color:'#6b7280',textTransform:'uppercase' }}>{totalItems} lot{totalItems>1?'s':''}</p><p style={{ fontWeight:900,fontSize:'18px',color:'#fff' }}>{totalPrice}€</p></div>
          <button onClick={()=>step==='cart'?setStep('form'):null} style={{ flex:1,background:'linear-gradient(135deg,#C4962A,#E8B84B)',color:'#000',padding:'14px',fontWeight:900,fontSize:'12px',textTransform:'uppercase',borderRadius:'4px',border:'none',cursor:'pointer' }}>{checkoutLoading ? '⏳ Redirection...' : step==='cart'?'ENVOYER MA DEMANDE →':'💳 PAYER MAINTENANT →'}</button>
        </div>
      </div>
      <Footer />
      <style>{`
        @media(min-width:768px){
          .cart-grid{display:grid!important;grid-template-columns:1fr 340px!important}
          .cart-sidebar{position:sticky!important;top:80px!important}
        }
        @media(max-width:767px){
          .cart-grid{display:flex!important;flex-direction:column!important}
          .cart-sidebar{position:static!important;top:auto!important}
        }
      `}</style>
    </main>
  )
}
