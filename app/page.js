'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { allProducts } from './data/products'

const bestSellers = allProducts.filter(p => [1, 2, 4, 9].includes(p.id))
const newDrops = allProducts.filter(p => p.isNew).slice(0, 4)

const categories = [
  { name: 'Sweats & Hoodies', count: 3, emoji: '🧥', id: 'sweats' },
  { name: 'T-Shirts', count: 3, emoji: '👕', id: 'tshirts' },
  { name: 'Doudounes', count: 2, emoji: '🏔️', id: 'doudounes' },
  { name: 'Jeans', count: 2, emoji: '👖', id: 'jeans' },
  { name: 'Sportswear', count: 2, emoji: '🏃', id: 'sportswear' },
  { name: 'Luxury', count: 1, emoji: '💎', id: 'luxury' },
]

const brands = ['NIKE', 'ADIDAS', 'THE NORTH FACE', 'RALPH LAUREN', 'CARHARTT', 'STÜSSY', "LEVI'S", 'TOMMY HILFIGER', 'PATAGONIA', "ARC'TERYX"]

const testimonials = [
  { name: 'Karim B.', text: 'Super qualité ! Je revends sur Vinted et mes clients sont toujours satisfaits. Les lots sont bien composés avec des pièces en très bon état.', rating: 5, city: 'Revendeur Vinted' },
  { name: 'Sarah M.', text: 'Livraison rapide depuis la France et service client réactif. Enfin un fournisseur fiable pour mon activité de revente !', rating: 5, city: 'Revendeuse Vinted' },
  { name: 'Thomas L.', text: 'Bon rapport qualité/prix et sélection sérieuse. Les pièces se revendent facilement à la pièce, je recommande.', rating: 5, city: 'Revendeur Vinted' },
]

const faqItems = [
  { q: 'Quel est le délai de livraison ?', a: 'Nous expédions rapidement depuis la Moselle. La livraison prend ensuite 2-5 jours ouvrés en France métropolitaine.' },
  { q: 'Comment sont composés les lots ?', a: 'Chaque lot est sélectionné avec soin par notre équipe. Nous choisissons uniquement des pièces de qualité, en bon état, de marques authentiques, avec un réel potentiel de revente.' },
  { q: 'Puis-je choisir les tailles ?', a: 'Oui ! Lors de votre commande, vous pouvez indiquer vos préférences de tailles et nous ferons notre maximum pour les respecter.' },
  { q: 'Les lots sont-ils adaptés pour Vinted ?', a: 'Absolument ! Nos lots sont pensés pour les revendeurs Vinted. Chaque pièce est sélectionnée pour son potentiel de revente à la pièce.' },
  { q: 'Y a-t-il un minimum de commande ?', a: "Non, vous pouvez commander à partir d'un seul lot. Des réductions sont appliquées dès 3 lots commandés." },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <main className="bg-transparent overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-black text-white overflow-hidden min-h-[80vh] md:min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 opacity-10 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #C4962A, transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-5 py-20 md:py-32 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-white/20 text-gray-400 text-[10px] font-bold px-3 py-1.5 mb-6 uppercase tracking-widest rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C4962A' }}></span>
              Grossiste • Moselle, France
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight uppercase">
              LOTS DE<br />
              <span style={{ color: '#C4962A' }}>VÊTEMENTS</span><br />
              DE SECONDE<br />
              MAIN
            </h1>
            <p className="text-gray-400 text-sm md:text-lg mb-8 leading-relaxed max-w-lg">
              Des lots sélectionnés avec soin, pensés pour la revente.
              Nike, Adidas, The North Face, Ralph Lauren…
              Expédition rapide depuis la France.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/produits" className="text-black px-8 py-4 font-black text-sm uppercase tracking-widest text-center hover:opacity-90 hover:scale-105 transition-all rounded" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                VOIR NOS LOTS →
              </Link>
              <Link href="/a-propos" className="border border-white/20 text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:border-white/50 hover:bg-white/5 transition-all text-center rounded">
                QUI SOMMES-NOUS ?
              </Link>
            </div>
            <div className="flex gap-6 md:gap-10 mt-12 pt-12 border-t border-white/10">
              {[
                { val: '🇫🇷', label: 'Depuis la France' },
                { val: '✋', label: 'Trié à la main' },
                { val: '⚡', label: 'Expédition rapide' },
                { val: '100%', label: 'Authentique' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-xl md:text-2xl font-black">{s.val}</div>
                  <div className="text-gray-500 text-[9px] md:text-xs mt-1 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-y border-white/10 py-6 md:py-8 fade-up">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-white/10">
            {[
              { emoji: '🚚', title: 'Expédition rapide', sub: 'Depuis la Moselle' },
              { emoji: '✋', title: 'Sélection manuelle', sub: 'Qualité contrôlée' },
              { emoji: '💰', title: 'Prix compétitifs', sub: 'Bonnes marges revente' },
              { emoji: '🤝', title: 'Service sérieux', sub: 'Confiance & transparence' },
            ].map((item, i) => (
              <div key={item.title} className="text-center px-4 py-2" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="text-xl md:text-2xl mb-1">{item.emoji}</div>
                <div className="font-bold text-xs md:text-sm text-white uppercase tracking-wide">{item.title}</div>
                <div className="text-[10px] md:text-xs text-gray-500 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW DROPS ── */}
      <section className="py-12 md:py-20 fade-up">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <span className="inline-block bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest mb-3">NEW</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase text-white">DERNIERS ARRIVAGES</h2>
            </div>
            <Link href="/produits" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              VOIR TOUT →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {newDrops.map((product, i) => (
              <div key={product.id} className="fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-6 md:hidden">
            <Link href="/produits" className="inline-block border border-white/20 text-white px-6 py-3 font-bold text-sm rounded uppercase tracking-wide hover:bg-white/5 transition-all">
              Tout afficher →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-12 md:py-20 border-t border-white/10 fade-up">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white">CATÉGORIES</h2>
            <Link href="/produits" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              SHOP ALL →
            </Link>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href="/produits"
                className="group text-center p-4 md:p-6 bg-[#111] border hover:border-yellow-600/50 hover:-translate-y-1 transition-all duration-300 rounded"
                style={{ borderColor: 'rgba(255,255,255,0.07)', transitionDelay: `${i * 0.05}s` }}
              >
                <div className="text-2xl md:text-3xl mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-110">{cat.emoji}</div>
                <h3 className="font-bold text-[10px] md:text-xs mb-0.5 text-white uppercase tracking-wide">{cat.name}</h3>
                <p className="text-[10px] text-gray-500">{cat.count} lots</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <section className="py-12 md:py-20 border-t border-white/10 fade-up">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <span className="inline-block text-[10px] font-black px-2 py-0.5 uppercase tracking-widest mb-3 rounded-sm" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }}>⭐ POPULAIRES</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase text-white">BEST SELLERS</h2>
            </div>
            <Link href="/produits" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              VOIR TOUT →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {bestSellers.map((product, i) => (
              <div key={product.id} className="fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS MARQUEE ── */}
      <section className="py-10 md:py-16 border-y border-white/10 overflow-hidden fade-up">
        <div className="max-w-7xl mx-auto px-5 mb-6 md:mb-8">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold text-center">Marques présentes dans nos lots</p>
        </div>
        <div className="overflow-hidden">
          <div className="brands-marquee">
            {[...brands, ...brands].map((brand, i) => (
              <span key={i} className="text-xl md:text-3xl font-black text-white/10 whitespace-nowrap hover:text-white/40 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-12 md:py-20 border-b border-white/10 fade-up">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white mb-2">COMMENT ÇA MARCHE ?</h2>
            <p className="text-gray-500 text-sm">Commandez en 3 étapes simples</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {[
              { step: '01', title: 'Choisissez votre lot', desc: 'Parcourez notre catalogue, consultez les détails de chaque lot et ajoutez-le à votre panier.', emoji: '🛒' },
              { step: '02', title: 'Passez commande', desc: 'Renseignez vos coordonnées, précisez vos préférences de tailles. Notre équipe vous contacte pour le paiement.', emoji: '📋' },
              { step: '03', title: 'Revendez à la pièce', desc: 'Recevez votre lot et revendez chaque pièce individuellement sur Vinted. Multipliez votre investissement !', emoji: '🚀' },
            ].map((item) => (
              <div key={item.step} className="bg-black p-6 md:p-10 text-center group hover:bg-[#0a0a0a] transition-colors">
                <div className="text-3xl md:text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{item.emoji}</div>
                <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#C4962A' }}>ÉTAPE {item.step}</div>
                <h3 className="text-base md:text-lg font-black text-white mb-3 uppercase">{item.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-12 md:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded overflow-hidden">
            <div className="bg-black p-6 md:p-12 fade-left">
              <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#C4962A' }}>Pourquoi ACA Wholesale ?</div>
              <h2 className="text-xl md:text-3xl font-black text-white mb-6 uppercase leading-tight">Un fournisseur fiable, pensé pour les revendeurs</h2>
              <p className="text-gray-400 leading-relaxed mb-4 text-sm">
                Après plusieurs années dans la revente de vêtements, nous avons créé ACA Wholesale pour répondre à un vrai besoin : proposer aux revendeurs des lots de qualité, sélectionnés avec soin, avec un bon potentiel de revente.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                Basés en Moselle, nous travaillons chaque jour pour offrir un service sérieux, transparent et efficace.
              </p>
              <div className="space-y-2 mb-8">
                {[
                  'Sélection rigoureuse des produits',
                  'Expédition rapide depuis la France',
                  'Lots pensés pour la revente sur Vinted',
                  'Relation de confiance durable',
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <span className="w-5 h-5 flex items-center justify-center text-[10px] font-black flex-shrink-0 rounded-sm" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }}>✓</span>
                    <span className="text-xs md:text-sm font-medium text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/a-propos" className="inline-block border border-white/20 text-white px-6 py-2.5 font-bold text-xs uppercase tracking-widest hover:border-white/50 hover:bg-white/5 transition-all rounded-sm">
                En savoir plus →
              </Link>
            </div>
            <div className="bg-[#0a0a0a] p-6 md:p-12 flex items-center justify-center min-h-[300px] fade-right">
              <div className="text-center">
                <div className="text-6xl mb-6">📦</div>
                <p className="text-white font-black text-lg uppercase">Notre entrepôt en Moselle</p>
                <p className="text-gray-500 text-sm mt-2">Tri, sélection et expédition depuis la France</p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { emoji: '✋', text: 'Tri manuel' },
                    { emoji: '🔍', text: 'Contrôle qualité' },
                    { emoji: '📏', text: 'Tailles variées' },
                    { emoji: '🚚', text: 'Envoi rapide' },
                  ].map(b => (
                    <div key={b.text} className="bg-black border border-white/10 rounded p-3 text-center hover:border-yellow-600/30 transition-colors">
                      <div className="text-lg mb-1">{b.emoji}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{b.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-12 md:py-20 border-b border-white/10 fade-up">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white">AVIS CLIENTS</h2>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Ce que disent nos revendeurs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#111] p-6 md:p-8 rounded hover:border-yellow-600/30 hover:-translate-y-1 transition-all duration-300 fade-up" style={{ border: '1px solid rgba(255,255,255,0.07)', transitionDelay: `${i * 0.12}s` }}>
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <span key={j} className="star-filled text-base">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-9 h-9 flex items-center justify-center font-black text-sm rounded-sm text-black" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 md:py-20 border-b border-white/10 fade-up">
        <div className="max-w-3xl mx-auto px-5">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white">FAQ</h2>
            <Link href="/faq" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              TOUT VOIR →
            </Link>
          </div>
          <div className="space-y-2">
            {faqItems.map((item, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open-item' : ''}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                >
                  <span className="font-bold text-sm text-white pr-4 uppercase tracking-wide">{item.q}</span>
                  <span style={{ color: '#C4962A', transition: 'transform 0.3s ease', display: 'inline-block', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', fontSize: '1.25rem' }}>+</span>
                </button>
                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                  <p className="px-4 md:px-5 pb-4 md:pb-5 text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 fade-up">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="border border-white/10 rounded p-10 md:p-16 hover:border-yellow-600/20 transition-colors">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-bold">ACA Wholesale</p>
            <h2 className="text-2xl md:text-5xl font-black uppercase text-white mb-4 leading-tight">
              Prêt à développer<br />votre activité ?
            </h2>
            <p className="text-gray-500 text-sm md:text-base mb-8 max-w-xl mx-auto">
              Accédez à des lots de vêtements de marque sélectionnés avec soin, expédiés rapidement depuis la France.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/produits" className="inline-block text-black px-8 md:px-10 py-4 font-black text-sm uppercase tracking-widest hover:opacity-90 hover:scale-105 transition-all rounded" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                VOIR NOS LOTS →
              </Link>
              <Link href="/contact" className="inline-block border border-white/20 text-white px-8 md:px-10 py-4 font-bold text-sm uppercase tracking-widest hover:border-white/50 hover:bg-white/5 transition-all rounded">
                NOUS CONTACTER
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
