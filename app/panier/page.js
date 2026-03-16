'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

export default function Panier() {
  const { items, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart()
  const { user, profile } = useAuth()
  const [step, setStep] = useState('cart')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '', adresse: '', ville: '', codePostal: '', pays: 'France', notes: ''
  })

  useEffect(() => {
    if (profile) {
      setForm(prev => ({
        ...prev,
        prenom: profile.first_name || '',
        nom: profile.last_name || '',
        email: user?.email || '',
        telephone: profile.phone || '',
        adresse: profile.address || '',
        ville: profile.city || '',
        codePostal: profile.postal_code || '',
        pays: profile.country || 'France',
      }))
    } else if (user) {
      setForm(prev => ({ ...prev, email: user.email || '' }))
    }
  }, [profile, user])

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const { data: orderData, error: orderError } = await supabase.from('orders').insert({
        user_id: user?.id || null,
        customer_name: `${form.prenom} ${form.nom}`.trim(),
        customer_email: form.email,
        customer_phone: form.telephone,
        address: form.adresse,
        city: form.ville,
        postal_code: form.codePostal,
        country: form.pays,
        notes: form.notes,
        total_price: totalPrice,
        status: 'en_attente',
      }).select().single()
      if (!orderError && orderData) {
        await supabase.from('order_items').insert(
          items.map(item => ({
            order_id: orderData.id,
            product_id: item.id,
            product_name: item.name,
            product_emoji: item.emoji,
            quantity: item.qty,
            price: item.price,
          }))
        )
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err)
    }
    clearCart()
    setStep('confirm')
    setSubmitting(false)
  }

  if (step === 'confirm') {
    return (
      <main className="bg-[#f0f0f3] min-h-screen">
        <Navbar />
        <div className="max-w-lg mx-auto px-5 py-16 md:py-24 text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
            <div className="text-5xl md:text-6xl mb-5">🎉</div>
            <h1 className="text-2xl md:text-3xl font-black mb-3">Commande reçue !</h1>
            <p className="text-gray-600 text-sm md:text-base mb-2">Merci <strong>{form.prenom}</strong>, votre commande a bien été enregistrée.</p>
            <p className="text-gray-500 text-sm mb-6">Nous vous contacterons sous 24h à <strong>{form.email}</strong> pour confirmer votre commande et les détails de paiement.</p>
            {user && (
              <Link href="/compte" className="block w-full bg-blue-600 text-white py-3.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors text-center mb-3">Suivre ma commande →</Link>
            )}
            <Link href="/produits" className="block w-full bg-black text-white py-3.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors text-center">Continuer mes achats</Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (items.length === 0 && step === 'cart') {
    return (
      <main className="bg-[#f0f0f3] min-h-screen">
        <Navbar />
        <div className="max-w-lg mx-auto px-5 py-16 md:py-24 text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
            <div className="text-5xl md:text-6xl mb-5">🛒</div>
            <h1 className="text-xl md:text-2xl font-black mb-3">Votre panier est vide</h1>
            <p className="text-gray-500 text-sm mb-8">Découvrez nos lots sélectionnés avec soin pour votre activité de revente.</p>
            <Link href="/produits" className="block w-full bg-black text-white py-3.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors text-center">Voir nos lots</Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-[#f0f0f3] overflow-x-hidden">
      <Navbar />
      <section className="bg-black text-white py-10 md:py-14 rounded-b-[24px] md:rounded-b-[40px]">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-2xl md:text-4xl font-black mb-1 md:mb-2">{step === 'cart' ? 'MON PANIER' : 'INFORMATIONS DE LIVRAISON'}</h1>
          <p className="text-gray-400 text-sm">{step === 'cart' ? `${totalItems} lot${totalItems > 1 ? 's' : ''} sélectionné${totalItems > 1 ? 's' : ''}` : 'Renseignez vos coordonnées pour finaliser la commande'}</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-5 py-5 md:py-6">
        <div className="flex items-center justify-center gap-3 md:gap-6">
          {['Panier', 'Livraison', 'Confirmation'].map((s, i) => {
            const stepMap = { 0: 'cart', 1: 'form', 2: 'confirm' }
            const isActive = stepMap[i] === step
            const isPast = (step === 'form' && i === 0) || (step === 'confirm' && i <= 1)
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${isActive ? 'bg-blue-600 text-white' : isPast ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {isPast ? '✓' : i + 1}
                </div>
                <span className={`text-xs md:text-sm font-semibold hidden sm:block ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
                {i < 2 && <span className="text-gray-300 text-xs md:text-sm">—</span>}
              </div>
            )
          })}
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-5 pb-10 md:pb-16">
        {step === 'cart' && (
          <div className="grid md:grid-cols-3 gap-5 md:gap-8">
            <div className="md:col-span-2 space-y-3 md:space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-4 md:p-5 flex gap-3 md:gap-4 items-center" style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -6px -6px 14px rgba(255,255,255,0.8)' }}>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl md:text-3xl" style={{ backgroundColor: item.color }}>{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm md:text-base truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-gray-100 rounded-full px-1">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors font-bold">−</button>
                        <span className="w-6 text-center text-sm font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors font-bold">+</button>
                      </div>
                      <span className="font-black text-base md:text-lg">{item.price * item.qty}€</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
              <Link href="/produits" className="block text-center text-sm text-blue-600 font-semibold py-3 hover:underline">+ Ajouter d&apos;autres lots</Link>
            </div>
            <div className="md:col-span-1">
              <div className="bg-white rounded-3xl p-5 md:p-6 sticky top-20" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
                <h3 className="font-black text-lg mb-4">Récapitulatif</h3>
                <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate mr-2">{item.name} ×{item.qty}</span>
                      <span className="font-semibold flex-shrink-0">{item.price * item.qty}€</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-1"><span className="text-sm text-gray-600">Sous-total</span><span className="font-bold">{totalPrice}€</span></div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100"><span className="text-sm text-gray-600">Livraison</span><span className="text-sm text-blue-600 font-semibold">À calculer</span></div>
                <div className="flex justify-between items-center mb-6"><span className="font-black text-lg">Total</span><span className="font-black text-2xl">{totalPrice}€</span></div>
                <button onClick={() => setStep('form')} className="w-full bg-black text-white py-4 rounded-full font-black text-sm hover:bg-blue-600 transition-colors">COMMANDER →</button>
                <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400"><span>🔒</span><span>Commande sécurisée</span></div>
              </div>
            </div>
          </div>
        )}
        {step === 'form' && (
          <div className="grid md:grid-cols-3 gap-5 md:gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
                <h2 className="text-lg md:text-xl font-black mb-2">Vos coordonnées</h2>
                {profile && <p className="text-xs text-blue-600 font-semibold mb-5">✓ Formulaire pré-rempli depuis votre profil</p>}
                {!user && <p className="text-xs text-gray-500 mb-5 bg-gray-50 rounded-xl p-3">💡 <Link href="/connexion?redirect=/panier" className="text-blue-600 font-bold hover:underline">Connectez-vous</Link> pour pré-remplir le formulaire et suivre votre commande.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Prénom *</label><input name="prenom" value={form.prenom} onChange={handleChange} required type="text" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="Votre prénom" /></div>
                  <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom *</label><input name="nom" value={form.nom} onChange={handleChange} required type="text" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="Votre nom" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email *</label><input name="email" value={form.email} onChange={handleChange} required type="email" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="votre@email.com" /></div>
                  <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Téléphone</label><input name="telephone" value={form.telephone} onChange={handleChange} type="tel" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="+33 6 00 00 00 00" /></div>
                </div>
                <div className="mb-4"><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Adresse *</label><input name="adresse" value={form.adresse} onChange={handleChange} required type="text" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="Numéro et nom de rue" /></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Code postal *</label><input name="codePostal" value={form.codePostal} onChange={handleChange} required type="text" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="75001" /></div>
                  <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ville *</label><input name="ville" value={form.ville} onChange={handleChange} required type="text" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="Paris" /></div>
                  <div className="col-span-2 md:col-span-1"><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pays *</label><select name="pays" value={form.pays} onChange={handleChange} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white rounded-xl"><option>France</option><option>Belgique</option><option>Suisse</option><option>Luxembourg</option><option>Allemagne</option><option>Autre</option></select></div>
                </div>
                <div className="mb-6"><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Notes / Préférences de tailles</label><textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black resize-none rounded-xl" placeholder="Indiquez vos préférences de tailles ou toute autre information utile..."></textarea></div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep('cart')} className="flex-1 border-2 border-gray-300 py-3.5 rounded-full font-bold text-sm hover:border-black transition-colors">← Retour</button>
                  <button type="submit" disabled={submitting} className="flex-1 bg-black text-white py-3.5 rounded-full font-black text-sm hover:bg-blue-600 transition-colors disabled:opacity-50">{submitting ? 'Envoi en cours...' : 'CONFIRMER LA COMMANDE'}</button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-4">En confirmant, notre équipe vous contactera par email pour les détails de paiement et d&apos;expédition.</p>
              </form>
            </div>
            <div className="md:col-span-1">
              <div className="bg-white rounded-3xl p-5 md:p-6 sticky top-20" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
                <h3 className="font-black text-base mb-4">Votre commande</h3>
                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: item.color }}>{item.emoji}</div>
                      <div className="flex-1 min-w-0"><p className="text-xs font-semibold truncate">{item.name}</p><p className="text-xs text-gray-400">×{item.qty}</p></div>
                      <span className="text-sm font-bold flex-shrink-0">{item.price * item.qty}€</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 flex justify-between items-center"><span className="font-black">Total</span><span className="font-black text-xl">{totalPrice}€</span></div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
