'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { allProducts } from './data/products'
import TestimonialsSection from '../components/TestimonialsSection'
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

const bestSellers = allProducts.filter(p => [1, 2, 4, 9].includes(p.id))
const newDrops = allProducts.filter(p => p.isNew).slice(0, 4)

const categories = [
  { name: 'Sweats & Hoodies', count: 3, emoji: 'ð§¥', id: 'sweats' },
  { name: 'T-Shirts', count: 3, emoji: 'ð', id: 'tshirts' },
  { name: 'Doudounes', count: 2, emoji: 'ðï¸', id: 'doudounes' },
  { name: 'Jeans', count: 2, emoji: 'ð', id: 'jeans' },
  { name: 'Sportswear', count: 2, emoji: 'ð', id: 'sportswear' },
  { name: 'Luxury', count: 1, emoji: 'ð', id: 'luxury' },
]

const brands = ['NIKE', 'ADIDAS', 'THE NORTH FACE', 'RALPH LAUREN', 'CARHARTT', 'STÃSSY', "LEVI'S", 'TOMMY HILFIGER', 'PATAGONIA', "ARC'TERYX"]

const faqItems = [
  { q: 'Quel est le dÃ©lai de livraison ?', a: 'Nous expÃ©dions rapidement depuis la Moselle. La livraison prend ensuite 2-5 jours ouvrÃ©s en France mÃ©tropolitaine.' },
  { q: 'Comment sont composÃ©s les lots ?', a: 'Chaque lot est sÃ©lectionnÃ© avec soin par notre Ã©quipe. Nous choisissons uniquement des piÃ¨ces de qualitÃ©, en bon Ã©tat, de marques authentiques, avec un rÃ©el potentiel de revente.' },
  { q: 'Puis-je choisir les tailles ?', a: 'Oui ! Lors de votre commande, vous pouvez indiquer vos prÃ©fÃ©rences de tailles et nous ferons notre maximum pour les respecter.' },
  { q: 'Les lots sont-ils adaptÃ©s pour Vinted ?', a: 'Absolument ! Nos lots sont pensÃ©s pour les revendeurs Vinted. Chaque piÃ¨ce est sÃ©lectionnÃ©e pour son potentiel de revente Ã  la piÃ¨ce.' },
  { q: "Y a-t-il un minimum de commande ?", a: "Non, vous pouvez commander Ã  partir d'un seul lot. Des rÃ©ductions sont appliquÃ©es dÃ¨s 3 lots commandÃ©s." },
]

const tiers = [
  {
    name: 'Basic',
    price: 'dÃ¨s 129â¬',
    pieces: '8-12 piÃ¨ces',
    brands: 'Multi-marques',
    margin: '30-50%',
    ideal: 'DÃ©buter',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: 'dÃ¨s 189â¬',
    pieces: '10-15 piÃ¨ces',
    brands: 'Nike, Adidas, TNF',
    margin: '50-80%',
    ideal: 'DÃ©velopper',
    highlighted: true,
  },
  {
    name: 'Luxury',
    price: 'dÃ¨s 349â¬',
    pieces: '6-8 piÃ¨ces',
    brands: 'Burberry, Tommy, CK',
    margin: '80-120%',
    ideal: 'Maximiser',
    highlighted: false,
  },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  const c1 = useCounter(500, 1800, statsVisible)
  const c2 = useCounter(12, 1400, statsVisible)
  const c3 = useCounter(48, 1200, statsVisible)
  const c4 = useCounter(100, 1600, statsVisible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <main className="bg-transparent overflow-x-hidden">
      <Navbar />

      {/* ââ HERO ââ */}
      <section className="relative text-white overflow-hidden min-h-[80vh] md:min-h-screen flex items-center">
        {/* Background grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        {/* Gold glow */}
        <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 opacity-10 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #C4962A, transparent)' }} />

        <div className="relative max-w-7xl mx-auto px-5 py-20 md:py-32 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-white/20 text-gray-400 text-[10px] font-bold px-3 py-1.5 mb-6 uppercase tracking-widest rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C4962A' }}></span>
              Grossiste â¢ Moselle, France
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight uppercase">
              LOTS DE<br />
              <span style={{ color: '#C4962A' }}>VÃTEMENTS</span><br />
              DE SECONDE<br />
              MAIN
            </h1>
            <p className="text-gray-400 text-sm md:text-lg mb-8 leading-relaxed max-w-lg">
              Des lots sÃ©lectionnÃ©s avec soin, pensÃ©s pour la revente.
              Nike, Adidas, The North Face, Ralph Laurenâ¦
              ExpÃ©dition rapide depuis la France.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/produits"
                className="text-black px-8 py-4 font-black text-sm uppercase tracking-widest text-center transition-all hover:opacity-90 rounded"
                style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
              >
                VOIR NOS LOTS â
              </Link>
              <Link
                href="/a-propos"
                className="border border-white/20 text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:border-white/50 transition-colors text-center rounded"
              >
                QUI SOMMES-NOUS ?
              </Link>
            </div>

            {/* Stats bar - animated counters */}
            <div ref={statsRef} className="flex gap-6 md:gap-10 mt-12 pt-12 border-t border-white/10">
              <div className="text-center">
                <div className="text-xl md:text-3xl font-black" style={{ color: '#E8B84B' }}>{c1}+</div>
                <div className="text-gray-500 text-[9px] md:text-xs mt-1 uppercase tracking-wide">Revendeurs</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-black" style={{ color: '#E8B84B' }}>{c2}</div>
                <div className="text-gray-500 text-[9px] md:text-xs mt-1 uppercase tracking-wide">Lots dispos</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-black" style={{ color: '#E8B84B' }}>{c3}h</div>
                <div className="text-gray-500 text-[9px] md:text-xs mt-1 uppercase tracking-wide">RÃ©ponse max</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-black" style={{ color: '#E8B84B' }}>{c4}%</div>
                <div className="text-gray-500 text-[9px] md:text-xs mt-1 uppercase tracking-wide">Authentique</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ââ TRUST BAR ââ */}
      <section className="border-y border-white/10 py-6 md:py-8" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-white/10">
            {[
              { emoji: 'ð', title: 'ExpÃ©dition rapide', sub: 'Depuis la Moselle' },
              { emoji: 'â', title: 'SÃ©lection manuelle', sub: 'QualitÃ© contrÃ´lÃ©e' },
              { emoji: 'ð°', title: 'Prix compÃ©titifs', sub: 'Bonnes marges revente' },
              { emoji: 'ð¤', title: 'Service sÃ©rieux', sub: 'Confiance & transparence' },
            ].map((item) => (
              <div key={item.title} className="text-center px-4 py-2">
                <div className="text-xl md:text-2xl mb-1">{item.emoji}</div>
                <div className="font-bold text-xs md:text-sm text-white uppercase tracking-wide">{item.title}</div>
                <div className="text-[10px] md:text-xs text-gray-500 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ NEW DROPS ââ */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <span className="inline-block bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest mb-3">NEW</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase text-white">DERNIERS ARRIVAGES</h2>
            </div>
            <Link href="/produits" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              VOIR TOUT â
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {newDrops.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-6 md:hidden">
            <Link href="/produits" className="inline-block border border-white/20 text-white px-6 py-3 font-bold text-sm rounded uppercase tracking-wide">
              Tout afficher â
            </Link>
          </div>
        </div>
      </section>

      {/* ââ CATEGORIES ââ */}
      <section className="py-12 md:py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white">CATÃGORIES</h2>
            <Link href="/produits" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              SHOP ALL â
            </Link>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/produits"
                className="group text-center p-4 md:p-6 hover:border-[#C4962A]/50 transition-all duration-300 rounded"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(6px)' }}
              >
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">{cat.emoji}</div>
                <h3 className="font-bold text-[10px] md:text-xs mb-0.5 text-white uppercase tracking-wide">{cat.name}</h3>
                <p className="text-[10px] text-gray-500">{cat.count} lots</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ââ BEST SELLERS ââ */}
      <section className="py-12 md:py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <span className="inline-block text-[10px] font-black px-2 py-0.5 uppercase tracking-widest mb-3 rounded-sm text-black" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>â­ POPULAIRES</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase text-white">BEST SELLERS</h2>
            </div>
            <Link href="/produits" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              VOIR TOUT â
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-6 md:hidden">
            <Link href="/produits" className="inline-block border border-white/20 text-white px-6 py-3 font-bold text-sm rounded uppercase tracking-wide">
              Tout afficher â
            </Link>
          </div>
        </div>
      </section>

      {/* ââ BRANDS MARQUEE ââ */}
      <section className="py-10 md:py-16 border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 mb-6 md:mb-8">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold text-center">Marques prÃ©sentes dans nos lots</p>
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

      {/* ââ HOW IT WORKS ââ */}
      <section className="py-12 md:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white mb-2">COMMENT ÃA MARCHE ?</h2>
            <p className="text-gray-500 text-sm">Commandez en 3 Ã©tapes simples</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
            {[
              { step: '01', title: 'Choisissez votre lot', desc: 'Parcourez notre catalogue, consultez les dÃ©tails de chaque lot et ajoutez-le Ã  votre panier.', emoji: 'ð' },
              { step: '02', title: 'Passez commande', desc: 'Renseignez vos coordonnÃ©es, prÃ©cisez vos prÃ©fÃ©rences de tailles. Notre Ã©quipe vous contacte pour le paiement.', emoji: 'ð' },
              { step: '03', title: 'Revendez Ã  la piÃ¨ce', desc: 'Recevez votre lot et revendez chaque piÃ¨ce individuellement sur Vinted. Multipliez votre investissement !', emoji: 'ð' },
            ].map((item) => (
              <div key={item.step} className="p-6 md:p-10 text-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
                <div className="text-3xl md:text-4xl mb-4">{item.emoji}</div>
                <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#C4962A' }}>ÃTAPE {item.step}</div>
                <h3 className="text-base md:text-lg font-black text-white mb-3 uppercase">{item.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ WHY US ââ */}
      <section className="py-12 md:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-px rounded overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="p-6 md:p-12" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#C4962A' }}>Pourquoi ACA Wholesale ?</div>
              <h2 className="text-xl md:text-3xl font-black text-white mb-6 uppercase leading-tight">Un fournisseur fiable, pensÃ© pour les revendeurs</h2>
              <p className="text-gray-400 leading-relaxed mb-4 text-sm">
                AprÃ¨s plusieurs annÃ©es dans la revente de vÃªtements, nous avons crÃ©Ã© ACA Wholesale pour rÃ©pondre Ã  un vrai besoin : proposer aux revendeurs des lots de qualitÃ©, sÃ©lectionnÃ©s avec soin, avec un bon potentiel de revente.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                BasÃ©s en Moselle, nous travaillons chaque jour pour offrir un service sÃ©rieux, transparent et efficace.
              </p>
              <div className="space-y-2 mb-8">
                {[
                  'SÃ©lection rigoureuse des produits',
                  'ExpÃ©dition rapide depuis la France',
                  'Lots pensÃ©s pour la revente sur Vinted',
                  'Relation de confiance durable',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center text-[10px] font-black flex-shrink-0 rounded-sm text-black" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>â</span>
                    <span className="text-xs md:text-sm font-medium text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/a-propos" className="inline-block border border-white/20 text-white px-6 py-2.5 font-bold text-xs uppercase tracking-widest hover:border-white/50 transition-colors rounded-sm">
                En savoir plus â
              </Link>
            </div>
            <div className="p-6 md:p-12 flex items-center justify-center min-h-[300px]" style={{ background: 'rgba(0,0,0,0.35)' }}>
              <div className="text-center">
                <div className="text-6xl mb-6">ð¦</div>
                <p className="text-white font-black text-lg uppercase">Notre entrepÃ´t en Moselle</p>
                <p className="text-gray-500 text-sm mt-2">Tri, sÃ©lection et expÃ©dition depuis la France</p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { emoji: 'â', text: 'Tri manuel' },
                    { emoji: 'ð', text: 'ContrÃ´le qualitÃ©' },
                    { emoji: 'ð', text: 'Tailles variÃ©es' },
                    { emoji: 'ð', text: 'Envoi rapide' },
                  ].map(b => (
                    <div key={b.text} className="rounded p-3 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
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

      {/* ââ TESTIMONIALS ââ */}
      

      {/* ââ COMPARISON TABLE ââ */}
      <section className="py-12 md:py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="inline-block text-[10px] font-black px-2 py-0.5 uppercase tracking-widest mb-3 rounded-sm text-black" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
              Nos gammes
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white mb-2">CHOISISSEZ VOTRE NIVEAU</h2>
            <p className="text-gray-500 text-sm">Des lots adaptÃ©s Ã  chaque type de revendeur</p>
          </div>
          <div className="grid grid-cols-3 gap-0 rounded overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className="flex flex-col"
                style={{
                  background: tier.highlighted ? 'rgba(196,150,42,0.12)' : 'rgba(0,0,0,0.4)',
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                <div
                  className="p-4 md:p-5 text-center"
                  style={tier.highlighted
                    ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }
                    : { background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }
                  }
                >
                  {tier.highlighted && (
                    <div className="text-[10px] font-black text-black/70 uppercase tracking-widest mb-1">â­ Le plus populaire</div>
                  )}
                  <div className={`font-black text-sm md:text-base uppercase tracking-wide ${tier.highlighted ? 'text-black' : 'text-white'}`}>{tier.name}</div>
                  <div className={`font-black text-lg md:text-2xl ${tier.highlighted ? 'text-black' : 'text-white'}`}>{tier.price}</div>
                </div>
                {[
                  { label: 'PiÃ¨ces', val: tier.pieces },
                  { label: 'Marques', val: tier.brands },
                  { label: 'Marge est.', val: tier.margin },
                  { label: 'IdÃ©al pour', val: tier.ideal },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="px-3 py-3 text-center"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-0.5">{row.label}</div>
                    <div className={`text-xs font-bold ${tier.highlighted ? 'text-[#E8B84B]' : 'text-white'}`}>{row.val}</div>
                  </div>
                ))}
                <div className="p-3 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <Link
                    href="/produits"
                    className="block text-center text-xs font-black py-2.5 rounded uppercase tracking-wide transition-all"
                    style={tier.highlighted
                      ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }
                      : { border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }
                    }
                  >
                    Voir les lots â
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ FAQ ââ */}
      <section className="py-12 md:py-20 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-5">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white">FAQ</h2>
            <Link href="/faq" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              TOUT VOIR â
            </Link>
          </div>
          <div className="space-y-2">
            {faqItems.map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                >
                  <span className="font-bold text-sm text-white pr-4 uppercase tracking-wide">{item.q}</span>
                  <span className="text-xl flex-shrink-0" style={{ color: '#C4962A' }}>{openFaq === i ? 'â' : '+'}</span>
                </button>
                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                  <p className="px-4 md:px-5 pb-4 md:pb-5 text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ CTA ââ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="rounded p-10 md:p-16" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-bold">ACA Wholesale</p>
            <h2 className="text-2xl md:text-5xl font-black uppercase text-white mb-4 leading-tight">
              PrÃªt Ã  dÃ©velopper<br />votre activitÃ© ?
            </h2>
            <p className="text-gray-500 text-sm md:text-base mb-8 max-w-xl mx-auto">
              AccÃ©dez Ã  des lots de vÃªtements de marque sÃ©lectionnÃ©s avec soin, expÃ©diÃ©s rapidement depuis la France.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/produits"
                className="inline-block text-black px-8 md:px-10 py-4 font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all rounded"
                style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
              >
                VOIR NOS LOTS â
              </Link>
              <Link
                href="/contact"
                className="inline-block border border-white/20 text-white px-8 md:px-10 py-4 font-bold text-sm uppercase tracking-widest hover:border-white/50 transition-colors rounded"
              >
                NOUS CONTACTER
              </Link>
            </div>
          </div>
        </div>
      </section>

                        <TestimonialsSection />

      <Footer />
    </main>
  )
}
