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

const brands = ['NIKE', 'ADIDAS', 'THE NORTH FACE', 'RALPH LAUREN', 'CARHARTT', 'STÜSSY', 'LEVI\'S', 'TOMMY HILFIGER', 'PATAGONIA', 'ARC\'TERYX']

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
  { q: 'Y a-t-il un minimum de commande ?', a: 'Non, vous pouvez commander à partir d\'un seul lot. Des réductions sont appliquées dès 3 lots commandés.' },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <main className="bg-[#f0f0f3] overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-gray-900 text-white overflow-hidden rounded-b-[24px] md:rounded-b-[40px]">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-950"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-5 py-16 md:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[10px] md:text-xs font-bold px-3 py-1.5 mb-4 md:mb-6 uppercase tracking-wider rounded-full">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
              Basé en Moselle, France
            </div>
            <h1 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-tight">
              Lots de Vêtements<br />
              <span className="text-blue-400">de Seconde Main</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed max-w-lg">
              Des lots sélectionnés avec soin, pensés pour la revente.
              Nike, Adidas, The North Face, Ralph Lauren...
              Expédition rapide depuis la France.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/produits" className="bg-white text-black px-6 md:px-8 py-3.5 md:py-4 font-black text-sm hover:bg-blue-50 transition-colors rounded-full text-center shadow-lg">
                VOIR NOS LOTS →
              </Link>
              <Link href="/a-propos" className="border-2 border-white/30 text-white px-6 md:px-8 py-3.5 md:py-4 font-bold text-sm hover:bg-white/10 transition-colors rounded-full text-center">
                QUI SOMMES-NOUS ?
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-3 md:gap-6 mt-8 md:mt-14">
              {[
                { val: '🇫🇷', label: 'Depuis la France' },
                { val: '✋', label: 'Trié à la main' },
                { val: '⚡', label: 'Expédition rapide' },
                { val: '100%', label: 'Authentique' },
              ].map(s => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-3 md:px-5 py-3 text-center flex-1 md:flex-none">
                  <div className="text-lg md:text-2xl font-black">{s.val}</div>
                  <div className="text-gray-400 text-[9px] md:text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
            {[
              { emoji: '🇫🇷', title: 'Expédié de France', sub: 'Depuis la Moselle' },
              { emoji: '✋', title: 'Sélection manuelle', sub: 'Qualité contrôlée' },
              { emoji: '💰', title: 'Prix compétitifs', sub: 'Bonnes marges revente' },
              { emoji: '🤝', title: 'Service sérieux', sub: 'Confiance & transparence' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-4 md:p-6 group hover:bg-black hover:text-white transition-all duration-300 cursor-default" style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -6px -6px 14px rgba(255,255,255,0.8)' }}>
                <div className="text-xl md:text-2xl mb-1 md:mb-2">{item.emoji}</div>
                <div className="font-bold text-xs md:text-sm">{item.title}</div>
                <div className="text-[10px] md:text-xs text-gray-500 group-hover:text-gray-300 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-10 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3">NOS CATÉGORIES</h2>
            <p className="text-gray-500 text-sm md:text-base">Trouvez le lot parfait pour votre activité</p>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/produits"
                className="group text-center p-4 md:p-6 bg-white rounded-2xl hover:bg-black hover:text-white transition-all duration-300"
                style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -6px -6px 14px rgba(255,255,255,0.8)' }}
              >
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">{cat.emoji}</div>
                <h3 className="font-bold text-[10px] md:text-sm mb-0.5 md:mb-1">{cat.name}</h3>
                <p className="text-[10px] md:text-xs text-gray-400 group-hover:text-gray-300">{cat.count} lots</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW DROPS */}
      <section className="py-10 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <div className="inline-block bg-red-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 mb-2 md:mb-3 uppercase tracking-wider rounded-full">
                Quantité limitée
              </div>
              <h2 className="text-2xl md:text-4xl font-black">NOUVEAUX ARRIVAGES</h2>
              <p className="text-gray-500 text-sm mt-1">Les derniers lots ajoutés cette semaine</p>
            </div>
            <Link href="/produits" className="hidden md:block text-sm font-bold hover:text-blue-600 transition-colors">
              Tout voir →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {newDrops.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-6 md:hidden">
            <Link href="/produits" className="bg-white text-black px-6 py-3 font-semibold hover:bg-black hover:text-white transition-colors inline-block rounded-full text-sm" style={{ boxShadow: '5px 5px 10px rgba(0,0,0,0.08), -5px -5px 10px rgba(255,255,255,0.9)' }}>
              Tout afficher →
            </Link>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-10 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <div className="inline-block bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 mb-2 md:mb-3 uppercase tracking-wider rounded-full">
                ⭐ Les plus populaires
              </div>
              <h2 className="text-2xl md:text-4xl font-black">NOS BEST SELLERS</h2>
              <p className="text-gray-500 text-sm mt-1">Les lots les plus populaires du moment</p>
            </div>
            <Link href="/produits" className="hidden md:block text-sm font-bold hover:text-blue-600 transition-colors">
              Tout voir →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-6 md:hidden">
            <Link href="/produits" className="bg-white text-black px-6 py-3 font-semibold hover:bg-black hover:text-white transition-colors inline-block rounded-full text-sm" style={{ boxShadow: '5px 5px 10px rgba(0,0,0,0.08), -5px -5px 10px rgba(255,255,255,0.9)' }}>
              Tout afficher →
            </Link>
          </div>
        </div>
      </section>

      {/* BRANDS BANNER */}
      <section className="bg-black text-white py-10 md:py-20 overflow-hidden rounded-[24px] md:rounded-[40px] mx-3 md:mx-4 my-6 md:my-8">
        <div className="max-w-7xl mx-auto px-5 text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-black mb-2 md:mb-3">
            DES MARQUES <span className="text-blue-500">QUI SE REVENDENT</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg">
            Sélectionnées pour leur fort potentiel de revente sur Vinted et ailleurs
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-8 md:gap-12 brands-marquee">
            {[...brands, ...brands].map((brand, i) => (
              <span key={i} className="text-lg md:text-3xl font-black text-gray-600 whitespace-nowrap hover:text-white transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-10 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3">COMMENT ÇA MARCHE ?</h2>
            <p className="text-gray-500 text-sm md:text-base">Commandez en 3 étapes simples</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { step: '01', title: 'Choisissez votre lot', desc: 'Parcourez notre catalogue, consultez les détails de chaque lot et ajoutez-le à votre panier.', emoji: '🛒' },
              { step: '02', title: 'Passez commande', desc: 'Renseignez vos coordonnées, précisez vos préférences de tailles. Notre équipe vous contacte pour le paiement.', emoji: '📋' },
              { step: '03', title: 'Revendez à la pièce', desc: 'Recevez votre lot et revendez chaque pièce individuellement sur Vinted. Multipliez votre investissement !', emoji: '🚀' },
            ].map((item, idx) => (
              <div key={item.step} className="relative text-center p-6 md:p-8 bg-white rounded-3xl flex md:block items-center gap-4 md:gap-0" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-gray-300 text-2xl">→</div>
                )}
                <div className="text-3xl md:text-5xl md:mb-4 flex-shrink-0">{item.emoji}</div>
                <div className="text-left md:text-center">
                  <div className="text-blue-600 font-black text-[10px] md:text-sm mb-1 md:mb-2 uppercase tracking-wider">Étape {item.step}</div>
                  <h3 className="text-base md:text-xl font-bold mb-1 md:mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-10 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="bg-white rounded-3xl p-6 md:p-10" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
              <div className="text-blue-600 font-bold text-[10px] md:text-sm uppercase tracking-wider mb-2 md:mb-3">Pourquoi ACA Wholesale ?</div>
              <h2 className="text-xl md:text-3xl font-black mb-4 md:mb-6">Un fournisseur fiable, pensé pour les revendeurs</h2>
              <p className="text-gray-600 leading-relaxed mb-3 md:mb-4 text-sm">
                Après plusieurs années dans la revente de vêtements, nous avons créé ACA Wholesale pour répondre à un vrai besoin : proposer aux revendeurs des lots de qualité, sélectionnés avec soin, avec un bon potentiel de revente.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-sm">
                Basés en Moselle, nous travaillons chaque jour pour offrir un service sérieux, transparent et efficace. Notre objectif est simple : vous permettre d&apos;accéder à des produits fiables, à des prix compétitifs.
              </p>
              <div className="space-y-2 md:space-y-3">
                {[
                  'Sélection rigoureuse des produits',
                  'Expédition rapide depuis la France',
                  'Lots pensés pour la revente sur Vinted',
                  'Relation de confiance durable',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 md:gap-3">
                    <span className="w-6 h-6 md:w-7 md:h-7 bg-blue-600 text-white flex items-center justify-center text-[10px] md:text-xs font-bold flex-shrink-0 rounded-full">✓</span>
                    <span className="text-xs md:text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/a-propos" className="inline-block border-2 border-black text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-black hover:text-white transition-colors">
                  En savoir plus →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-3xl aspect-square items-center justify-center hidden md:flex" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
              <div className="text-center px-8">
                <div className="text-7xl mb-6">📦</div>
                <p className="text-gray-700 font-bold text-lg">Notre entrepôt en Moselle</p>
                <p className="text-gray-400 text-sm mt-2">Tri, sélection et expédition depuis la France</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { emoji: '✋', text: 'Tri manuel' },
                    { emoji: '🔍', text: 'Contrôle qualité' },
                    { emoji: '📏', text: 'Tailles variées' },
                    { emoji: '🚚', text: 'Envoi rapide' },
                  ].map(b => (
                    <div key={b.text} className="bg-gray-50 rounded-xl p-2 text-center">
                      <div className="text-lg mb-0.5">{b.emoji}</div>
                      <div className="text-[10px] font-semibold text-gray-600">{b.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3">AVIS CLIENTS</h2>
            <p className="text-gray-500 text-sm md:text-base">Ce que disent nos revendeurs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-8" style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -6px -6px 14px rgba(255,255,255,0.8)' }}>
                <div className="flex gap-1 mb-3 md:mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <span key={j} className="star-filled text-base md:text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 md:mb-6 text-sm leading-relaxed">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-black text-white flex items-center justify-center font-bold text-sm rounded-full">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-24">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3">FAQ</h2>
            <p className="text-gray-500 text-sm md:text-base">Questions fréquemment posées</p>
          </div>
          <div className="space-y-3 md:space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-50 transition-colors rounded-2xl"
                >
                  <span className="font-semibold text-sm pr-2">{item.q}</span>
                  <span className="text-xl flex-shrink-0 text-gray-400">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                  <p className="px-4 md:px-5 pb-4 md:pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/faq" className="text-blue-600 font-semibold text-sm hover:underline">
              Voir toutes les questions →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 md:py-20 rounded-[24px] md:rounded-[40px] mx-3 md:mx-4 mb-6 md:mb-8">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="text-3xl md:text-4xl mb-4">🚀</div>
          <h2 className="text-xl md:text-4xl font-black mb-3 md:mb-4">
            Prêt à développer votre activité de revente ?
          </h2>
          <p className="text-blue-100 text-sm md:text-lg mb-6 md:mb-8 max-w-xl mx-auto">
            Accédez à des lots de vêtements de marque sélectionnés avec soin, expédiés rapidement depuis la France.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/produits" className="inline-block bg-white text-black px-8 md:px-10 py-3.5 md:py-4 font-black text-sm hover:bg-gray-100 transition-colors rounded-full shadow-lg">
              VOIR NOS LOTS →
            </Link>
            <Link href="/contact" className="inline-block border-2 border-white/40 text-white px-8 md:px-10 py-3.5 md:py-4 font-bold text-sm hover:bg-white/10 transition-colors rounded-full">
              NOUS CONTACTER
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
