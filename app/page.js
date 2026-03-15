'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

const bestSellers = [
  { id: 1, name: 'Ballot Premium Nike / Adidas', description: '10 pièces - Sweats & Hoodies', price: 189, originalPrice: 249, rating: 5, reviews: 127, badge: 'BEST SELLER', emoji: '👟', brand: 'Nike / Adidas', color: '#f0f4ff' },
  { id: 2, name: 'Ballot The North Face', description: '8 pièces - Doudounes & Polaires', price: 299, originalPrice: 399, rating: 5, reviews: 89, badge: '-25%', emoji: '🏔️', brand: 'The North Face', color: '#f0fdf4' },
  { id: 3, name: 'Ballot Ralph Lauren', description: '12 pièces - Polos & Chemises', price: 219, originalPrice: 289, rating: 4, reviews: 64, emoji: '🐎', brand: 'Ralph Lauren', color: '#fefce8' },
  { id: 4, name: 'Ballot Streetwear Mix', description: '15 pièces - Stüssy, Carhartt, Supreme', price: 349, originalPrice: 449, rating: 5, reviews: 201, badge: 'POPULAIRE', isNew: true, emoji: '🔥', brand: 'Multi-marques', color: '#fef2f2' },
]

const newDrops = [
  { id: 5, name: 'Ballot Printemps Nike', description: '10 pièces - T-shirts & Shorts', price: 149, rating: 5, reviews: 12, isNew: true, emoji: '☀️', brand: 'Nike', color: '#ecfdf5' },
  { id: 6, name: 'Ballot Denim Levi\'s', description: '8 pièces - Jeans & Vestes', price: 199, originalPrice: 259, rating: 4, reviews: 8, isNew: true, emoji: '👖', brand: 'Levi\'s', color: '#eff6ff' },
  { id: 7, name: 'Ballot Adidas Originals', description: '12 pièces - Tracksuits & Tees', price: 179, rating: 5, reviews: 15, isNew: true, emoji: '⚡', brand: 'Adidas', color: '#f5f3ff' },
  { id: 8, name: 'Ballot Luxury Mix', description: '6 pièces - Burberry, Tommy, CK', price: 399, originalPrice: 529, rating: 5, reviews: 6, badge: 'EXCLUSIF', isNew: true, emoji: '💎', brand: 'Luxury', color: '#fdf4ff' },
]

const categories = [
  { name: 'Sweats & Hoodies', count: 45, emoji: '🧥', color: '#1e293b' },
  { name: 'T-Shirts', count: 38, emoji: '👕', color: '#334155' },
  { name: 'Doudounes', count: 22, emoji: '🧥', color: '#475569' },
  { name: 'Jeans & Pantalons', count: 31, emoji: '👖', color: '#1e293b' },
  { name: 'Sportswear', count: 27, emoji: '🏃', color: '#334155' },
  { name: 'Accessoires', count: 19, emoji: '🎒', color: '#475569' },
]

const brands = ['NIKE', 'ADIDAS', 'THE NORTH FACE', 'RALPH LAUREN', 'CARHARTT', 'STÜSSY', 'LEVI\'S', 'TOMMY HILFIGER', 'PATAGONIA', 'ARC\'TERYX']

const testimonials = [
  { name: 'Karim B.', text: 'Qualité incroyable ! Les ballots sont toujours bien composés, je recommande à 100%.', rating: 5, city: 'Paris' },
  { name: 'Sarah M.', text: 'Livraison rapide et service client au top. Mon business a décollé grâce à ACA.', rating: 5, city: 'Lyon' },
  { name: 'Thomas L.', text: 'Meilleur rapport qualité/prix du marché. Fidèle client depuis 6 mois.', rating: 5, city: 'Marseille' },
]

const faqItems = [
  { q: 'Quel est le délai de livraison ?', a: 'Nous expédions sous 48h. La livraison prend ensuite 2-5 jours ouvrés en France métropolitaine.' },
  { q: 'Comment sont composés les ballots ?', a: 'Chaque ballot est composé manuellement par notre équipe. Nous sélectionnons uniquement des pièces de qualité, en bon état, de marques authentiques.' },
  { q: 'Puis-je choisir les tailles ?', a: 'Oui ! Lors de votre commande, vous pouvez indiquer vos préférences de tailles et nous ferons notre maximum pour les respecter.' },
  { q: 'Proposez-vous des retours ?', a: 'Nous offrons un échange ou avoir sous 14 jours si le ballot ne correspond pas à sa description.' },
  { q: 'Y a-t-il un minimum de commande ?', a: 'Non, vous pouvez commander à partir d\'un seul ballot. Des réductions sont appliquées dès 3 ballots commandés.' },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <main>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 mb-6 uppercase tracking-wider">
              Grossiste N°1 en France
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Ballots de<br />
              <span className="text-blue-500">Vêtements de Marque</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg">
              +300 catégories disponibles. Nike, Adidas, The North Face, Ralph Lauren...
              Des ballots triés à la main, livrés dans toute l&apos;Europe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/produits" className="bg-white text-black px-8 py-4 font-bold text-sm hover:bg-gray-200 transition-colors">
                VOIR NOS BALLOTS
              </Link>
              <Link href="/a-propos" className="border-2 border-white text-white px-8 py-4 font-bold text-sm hover:bg-white hover:text-black transition-colors">
                EN SAVOIR PLUS
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl font-black">500+</div>
                <div className="text-gray-400 text-sm">Avis clients</div>
              </div>
              <div>
                <div className="text-3xl font-black">10K+</div>
                <div className="text-gray-400 text-sm">Ballots vendus</div>
              </div>
              <div>
                <div className="text-3xl font-black">48h</div>
                <div className="text-gray-400 text-sm">Expédition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESS / TRUST BAR */}
      <section className="bg-gray-50 py-6 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">
            Ils parlent de nous
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-16 opacity-40 flex-wrap">
            {['COSMOPOLITAN', 'M6', 'LE PROGRÈS', 'ELLE', 'BFM'].map((name) => (
              <span key={name} className="text-lg md:text-xl font-bold tracking-wider">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">NOS CATÉGORIES</h2>
            <p className="text-gray-500">Trouvez le ballot parfait pour votre business</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/produits"
                className="group text-center p-6 bg-gray-50 hover:bg-black hover:text-white transition-all duration-300"
              >
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h3 className="font-bold text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-300">{cat.count} ballots</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW DROPS */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 mb-4 uppercase tracking-wider">
              Quantité limitée
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-3">NOUVEAUX ARRIVAGES</h2>
            <p className="text-gray-500">Les derniers ballots ajoutés cette semaine</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newDrops.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/produits" className="btn-outline inline-block">
              Tout afficher →
            </Link>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">NOS BEST SELLERS</h2>
            <p className="text-gray-500">Les ballots les plus populaires du moment</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/produits" className="btn-outline inline-block">
              Tout afficher →
            </Link>
          </div>
        </div>
      </section>

      {/* BRANDS BANNER */}
      <section className="bg-black text-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-3">
            GROSSISTE <span className="text-blue-500">N°1</span> EN FRANCE
          </h2>
          <p className="text-gray-400 text-lg">
            Nous fournissons les plus grandes marques
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-12 brands-marquee">
            {[...brands, ...brands].map((brand, i) => (
              <span key={i} className="text-2xl md:text-3xl font-black text-gray-600 whitespace-nowrap hover:text-white transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-3">COMMENT ÇA MARCHE ?</h2>
            <p className="text-gray-500">En 3 étapes simples</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { step: '01', title: 'Choisissez votre ballot', desc: 'Parcourez notre catalogue et sélectionnez le ballot qui correspond à votre business.', emoji: '🛒' },
              { step: '02', title: 'Passez commande', desc: 'Commandez en ligne ou contactez-nous directement. Paiement sécurisé.', emoji: '💳' },
              { step: '03', title: 'Recevez & Revendez', desc: 'Livraison sous 48h. Revendez les pièces et multipliez votre investissement.', emoji: '🚀' },
            ].map((item) => (
              <div key={item.step} className="text-center p-8">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <div className="text-blue-600 font-black text-sm mb-2">ÉTAPE {item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">AVIS CLIENTS</h2>
            <p className="text-gray-500">Ce que disent nos clients</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 border">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <span key={j} className="star-filled text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-sm leading-relaxed">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-sm">
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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">FAQ</h2>
            <p className="text-gray-500">Questions fréquemment posées</p>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="border">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-sm">{item.q}</span>
                  <span className="text-xl ml-4 flex-shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Prêt à lancer votre business ?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Rejoignez +2000 revendeurs qui font confiance à ACA Wholesale.
          </p>
          <Link href="/produits" className="inline-block bg-white text-black px-10 py-4 font-bold text-sm hover:bg-gray-100 transition-colors">
            COMMANDER MAINTENANT
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
