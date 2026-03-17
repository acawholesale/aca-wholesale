'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useCart } from '../../context/CartContext'

export default function Panier() {
  const { items, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart()
  const [step, setStep] = useState('cart')
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '', adresse: '', ville: '', codePostal: '', pays: 'France', notes: '' })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); setStep('confirm'); clearCart() }

  const inputClass = "w-full border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4962A] placeholder-gray-700"
  const inputStyle = { background: 'rgba(15,10,0,0.8)' }
  const labelClass = "block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"

  if (step === 'confirm') {
    return (
      <main className="bg-transparent min-h-screen">
        <Navbar />
        <div className="max-w-lg mx-auto px-5 py-16 md:py-24 text-center">
          <div className="border border-white/10 p-8 md:p-12" style={{ background: 'rgba(15,10,0,0.8)', backdropFilter: 'blur(8px)' }}>
            <div className="text-5xl mb-5">🎉</div>
            <h1 className="text-2xl md:text-3xl font-black uppercase text-white mb-3">Commande reçue !</h1>
            <p className="text-gray-400 text-sm mb-2">Merci <strong className="text-white">{form.prenom}</strong>, votre commande a bien été enregistrée.</p>
            <p className="text-gray-500 text-sm mb-8">Nous vous contacterons sous 24h à <strong className="text-gray-300">{form.email}</strong>.</p>
            <div className="border border-[#C4962A]/30 p-4 mb-8 text-left" style={{ background: 'rgba(196,150,42,0.05)' }}>
              <p className="text-[10px] font-black mb-1 uppercase tracking-widest" style={{ color: '#C4962A' }}>📧 PROCHAINE ÉTAPE</p>
              <p className="text-xs text-gray-400">Notre équipe en Moselle vous contactera rapidement pour finaliser votre commande et organiser l&apos;expédition.</p>
            </div>
            <Link href="/produits" className="block w-full text-black py-4 font-black text-xs uppercase tracking-widest text-center hover:opacity-90 transition-all" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
              Continuer mes achats
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (items.length === 0 && step === 'cart') {
    return (
      <main className="bg-transparent min-h-screen">
        <Navbar />
        <div className="max-w-lg mx-auto px-5 py-16 md:py-24 text-center">
          <div className="border border-white/10 p-8 md:p-12" style={{ background: 'rgba(15,10,0,0.8)', backdropFilter: 'blur(8px)' }}>
            <div className="text-5xl mb-5">🛒</div>
            <h1 className="text-xl md:text-2xl font-black uppercase text-white mb-3">Votre panier est vide</h1>
            <p className="text-gray-500 text-sm mb-8">Découvrez nos lots sélectionnés pour votre activité de revente.</p>
            <Link href="/produits" className="block w-full text-black py-4 font-black text-xs uppercase tracking-widest text-center hover:opacity-90 transition-all" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
              Voir nos lots
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-transparent overflow-x-hidden">
      <Navbar />

      <section className="text-white py-10 md:py-14 border-b border-white/10" style={{ background: 'rgba(8,5,0,0.5)' }}>
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-2xl md:text-4xl font-black uppercase mb-1">{step === 'cart' ? 'MON PANIER' : 'INFORMATIONS DE LIVRAISON'}</h1>
          <p className="text-gray-500 text-xs uppercase tracking-wide">{step === 'cart' ? `${totalItems} lot${totalItems > 1 ? 's' : ''} sélectionné${totalItems > 1 ? 's' : ''}` : 'Renseignez vos coordonnées'}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3 md:gap-6">
          {['Panier', 'Livraison', 'Confirmation'].map((s, i) => {
            const stepMap = { 0: 'cart', 1: 'form', 2: 'confirm' }
            const isActive = stepMap[i] === step
            const isPast = (step === 'form' && i === 0) || (step === 'confirm' && i <= 1)
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 flex items-center justify-center text-xs font-black ${isPast ? 'bg-green-600 text-white' : !isActive ? 'text-gray-600' : 'text-black'}`} style={isActive ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)' } : { background: 'rgba(255,255,255,0.05)' }}>
                  {isPast ? '✓' : i + 1}
                </div>
                <span className={`text-[10px] font-black hidden sm:block uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-600'}`}>{s}</span>
                {i < 2 && <span className="text-white/10 text-xs">—</span>}
              </div>
            )
          })}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-5 pb-24 md:pb-16 py-6">
        {step === 'cart' && (
          <div className="grid md:grid-cols-3 gap-5 md:gap-8">
            <div className="md:col-span-2 space-y-3">
              {items.map(item => (
                <div key={item.id} className="border border-white/10 p-4 flex gap-3 items-center" style={{ background: 'rgba(15,10,0,0.7)', backdropFilter: 'blur(4px)' }}>
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0 text-2xl md:text-3xl" style={{ backgroundColor: item.color }}>{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-xs text-white uppercase tracking-wide truncate">{item.name}</h3>
                    <p className="text-[10px] text-gray-500 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 border border-white/10 px-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white font-black">−</button>
                        <span className="w-6 text-center text-sm font-black text-white">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white font-black">+</button>
                      </div>
                      <span className="font-black text-base text-white">{item.price * item.qty}€</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors p-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
              <Link href="/produits" className="block text-center text-[10px] font-black py-3 uppercase tracking-widest hover:text-white transition-colors" style={{ color: '#C4962A' }}>+ Ajouter d&apos;autres lots</Link>
            </div>
            <div className="hidden md:block md:col-span-1">
              <div className="border border-white/10 p-5 sticky top-20" style={{ background: 'rgba(15,10,0,0.85)', backdropFilter: 'blur(8px)' }}>
                <h3 className="font-black text-[10px] uppercase tracking-widest text-white mb-4">Récapitulatif</h3>
                <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-gray-500 truncate mr-2">{item.name}
