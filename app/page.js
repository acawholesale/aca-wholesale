import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import TestimonialsSection from '../components/TestimonialsSection'
import { allProducts } from './data/products'

import HeroSection from '../components/home/HeroSection'
import TrustBar from '../components/home/TrustBar'
import CategoriesSection from '../components/home/CategoriesSection'
import HowItWorksSection from '../components/home/HowItWorksSection'
import WhyUsSection from '../components/home/WhyUsSection'
import ComparisonTable from '../components/home/ComparisonTable'
import FaqSection from '../components/home/FaqSection'
import CtaSection from '../components/home/CtaSection'

const bestSellers = allProducts.filter(p => [1, 2, 4, 9].includes(p.id))
const newDrops = allProducts.filter(p => p.isNew).slice(0, 4)

const brands = ['NIKE', 'ADIDAS', 'THE NORTH FACE', 'RALPH LAUREN', 'CARHARTT', 'STÜSSY', "LEVI'S", 'TOMMY HILFIGER', 'PATAGONIA', "ARC'TERYX"]

export default function Home() {
  return (
    <main id="main-content" className="bg-transparent overflow-x-hidden">
      <Navbar />

      <HeroSection />

      <TrustBar />

      {/* ── NEW DROPS ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <span className="inline-block bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest mb-3">NEW</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase text-white">DERNIERS ARRIVAGES</h2>
            </div>
            <Link href="/produits" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">
              VOIR TOUT →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {newDrops.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-6 md:hidden">
            <Link href="/produits" className="inline-block border border-white/20 text-white px-6 py-3 font-bold text-sm rounded uppercase tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1">
              Tout afficher →
            </Link>
          </div>
        </div>
      </section>

      <CategoriesSection />

      {/* ── BEST SELLERS ── */}
      <section className="py-12 md:py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <span className="bg-gold-gradient inline-block text-[10px] font-black px-2 py-0.5 uppercase tracking-widest mb-3 rounded-sm text-black">⭐ POPULAIRES</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase text-white">BEST SELLERS</h2>
            </div>
            <Link href="/produits" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">
              VOIR TOUT →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-6 md:hidden">
            <Link href="/produits" className="inline-block border border-white/20 text-white px-6 py-3 font-bold text-sm rounded uppercase tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1">
              Tout afficher →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRANDS MARQUEE ── */}
      <section className="py-10 md:py-16 border-y border-white/10 overflow-hidden" aria-label="Marques présentes dans nos lots">
        <div className="max-w-7xl mx-auto px-5 mb-6 md:mb-8">
          <p className="text-gray-400 text-xs uppercase tracking-widest font-bold text-center">Marques présentes dans nos lots</p>
        </div>
        <div className="overflow-hidden" aria-hidden="true">
          <div className="brands-marquee">
            {[...brands, ...brands].map((brand, i) => (
              <span key={i} className="text-xl md:text-3xl font-black text-white/10 whitespace-nowrap hover:text-white/40 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HowItWorksSection />

      <WhyUsSection />

      <TestimonialsSection />

      <ComparisonTable />

      <FaqSection />

      <CtaSection />

      <Footer />
    </main>
  )
}
