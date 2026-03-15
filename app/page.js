'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

const bestSellers = [
  { id: 1, name: 'Lot Premium Nike / Adidas', description: '10 pièces - Sweats & Hoodies', price: 189, originalPrice: 249, rating: 5, reviews: 127, badge: 'BEST SELLER', emoji: '👟', brand: 'Nike / Adidas', color: '#f0f4ff' },
  { id: 2, name: 'Lot The North Face', description: '8 pièces - Doudounes & Polaires', price: 299, originalPrice: 399, rating: 5, reviews: 89, badge: '-25%', emoji: '🏔️', brand: 'The North Face', color: '#f0fdf4' },
  { id: 3, name: 'Lot Ralph Lauren', description: '12 pièces - Polos & Chemises', price: 219, originalPrice: 289, rating: 4, reviews: 64, emoji: '🐎', brand: 'Ralph Lauren', color: '#fefce8' },
  { id: 4, name: 'Lot Streetwear Mix', description: '15 pièces - Stüssy, Carhartt, Supreme', price: 349, originalPrice: 449, rating: 5, reviews: 201, badge: 'POPULAIRE', isNew: true, emoji: '🔥', brand: 'Multi-marques', color: '#fef2f2' },
]

const newDrops = [
  { id: 5, name: 'Lot Printemps Nike', description: '10 pièces - T-shirts & Shorts', price: 149, rating: 5, reviews: 12, isNew: true, emoji: '☀️', brand: 'Nike', color: '#ecfdf5' },
  { id: 6, name: 'Lot Denim Levi\'s', description: '8 pièces - Jeans & Vestes', price: 199, originalPrice: 259, rating: 4, reviews: 8, isNew: true, emoji: '👖', brand: 'Levi\'s', color: '#eff6ff' },
  { id: 7, name: 'Lot Adidas Originals', description: '12 pièces - Tracksuits & Tees', price: 179, rating: 5, reviews: 15, isNew: true, emoji: '⚡', brand: 'Adidas', color: '#f5f3ff' },
  { id: 8, name: 'Lot Luxury Mix', description: '6 pièces - Burberry, Tommy, CK', price: 399, originalPrice: 529, rating: 5, reviews: 6, badge: 'EXCLUSIF', isNew: true, emoji: '💎', brand: 'Luxury', color: '#fdf4ff' },
]

const categories = [
  { name: 'Sweats & Hoodies', count: 45, emoji: '🧥' },
  { name: 'T-Shirts', count: 38, emoji: '👕' },
  { name: 'Doudounes', count: 22, emoji: '🧥' },
  { name: 'Jeans & Pantalons', count: 31, emoji: '👖' },
  { name: 'Sportswear', count: 27, emoji: '🏃' },
  { name: 'Accessoires', count: 19, emoji: '🎒' },
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
              Basé en Moselle, France
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Lots de Vêtements<br />
              <span className="text-blue-500">de Seconde Main</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg">
              Des lots sélectionnés avec soin, pensés pour la revente.
              Nike, Adidas, The North Face, Ralph Lauren...
              Expédition rapide depuis la France.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/produits" className="bg-white text-black px-8 py-4 font-bold text-sm hover:bg-gray-200 transition-colors">
                VOIR NOS LOTS
              </Link>
              <Link href="/a-propos" className="border-2 border-white text-white px-8 py-4 font-bold text-sm hover:bg-white hover:text-black transition-colors">
                QUI SOMMES-NOUS ?
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl font-black">🇫🇷</div>
                <div className="text-gray-400 text-sm">Depuis la France</div>
              </div>
              <div>
                <div className="text-3xl font-black">Trié</div>
                <div className="text-gray-400 text-sm">À la main</div>
              </div>
              <div>
                <div className="text-3xl font-black">Rapide</div>
                <div className="text-gray-400 text-sm">Expédition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-gray-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🇫🇷</div>
              <div className="font-bold text-sm">Expédié de France</div>
              <div className="text-xs text-gray-500">Depuis la Moselle</div>
            </div>
            <div>
              <div className="text-2xl mb-2">✋</div>
              <div className="font-bold text-sm">Sélection manuelle</div>
              <div className="text-xs text-gray-500">Qualité contrôlée</div>
            </div>
            <div>
              <div className="text-2xl mb-2">💰</div>
              <div className="font-bold text-sm">Prix compétitifs</div>
              <div className="text-xs text-gray-500">Bonnes marges de revente</div>
            </div>
            <div>
              <div className="text-2xl mb-2">🤝</div>
              <div className="font-bold text-sm">Service transparent</div>
              <div className="text-xs text-gray-500">Confiance & sérieux</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">NOS CATÉGORIES</h2>
            <p className="text-gray-500">Trouvez le lot parfait pour votre activité de revente</p>
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
                <p className="text-xs text-gray-400 group-hover:text-gray-300">{cat.count} lots</p>
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
            <p className="text-gray-500">Les derniers lots ajoutés cette semaine</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newDrops.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/produits" className="border-2 border-black text-black px-8 py-3 font-semibold hover:bg-black hover:text-white transition-colors inline-block">
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
            <p className="text-gray-500">Les lots les plus populaires du moment</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/produits" className="border-2 border-black text-black px-8 py-3 font-semibold hover:bg-black hover:text-white transition-colors inline-block">
              Tout afficher →
            </Link>
          </div>
        </div>
      </section>

      {/* BRANDS BANNER */}
      <section className="bg-black text-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-3">
            DES MARQUES <span className="text-blue-500">QUI SE REVENDENT</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Des pièces sélectionnées pour leur potentiel de revente
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
              { step: '01', title: 'Choisissez votre lot', desc: 'Parcourez notre catalogue et sélectionnez le lot qui correspond à votre activité de revente sur Vinted ou ailleurs.', emoji: '🛒' },
              { step: '02', title: 'Passez commande', desc: 'Commandez en ligne ou contactez-nous. Paiement sécurisé et expédition rapide depuis la Moselle.', emoji: '💳' },
              { step: '03', title: 'Revendez à la pièce', desc: 'Recevez votre lot et revendez chaque pièce individuellement sur Vinted. Multipliez votre investissement.', emoji: '🚀' },
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

      {/* WHY US */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">Pourquoi ACA Wholesale ?</div>
              <h2 className="text-3xl font-black mb-6">Un fournisseur fiable, pensé pour les revendeurs</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Après plusieurs années dans la revente de vêtements, nous avons créé ACA Wholesale pour répondre à un vrai besoin : proposer aux revendeurs des lots de qualité, sélectionnés avec soin, avec un bon potentiel de revente.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Basés en Moselle, nous travaillons chaque jour pour offrir un service sérieux, transparent et efficace. Notre objectif est simple : vous permettre d&apos;accéder à des produits fiables, à des prix compétitifs.
              </p>
              <div className="space-y-3">
                {[
                  'Sélection rigoureuse des produits',
                  'Expédition rapide depuis la France',
                  'Lots pensés pour la revente sur Vinted',
                  'Relation de confiance durable',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 font-medium">Notre entrepôt en Moselle</p>
                <p className="text-gray-400 text-sm">Tri et expédition depuis la France</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">AVIS CLIENTS</h2>
            <p className="text-gray-500">Ce que disent nos revendeurs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 p-8 border">
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">FAQ</h2>
            <p className="text-gray-500">Questions fréquemment posées</p>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="border bg-white">
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
            Prêt à développer votre activité de revente ?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Accédez à des lots de vêtements de marque sélectionnés avec soin, expédiés rapidement depuis la France.
          </p>
          <Link href="/produits" className="inline-block bg-white text-black px-10 py-4 font-bold text-sm hover:bg-gray-100 transition-colors">
            VOIR NOS LOTS
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
