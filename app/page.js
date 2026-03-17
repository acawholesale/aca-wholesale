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
  { q: "Y a-t-il un minimum de commande ?", a: "Non, vous pouvez commander à partir d'un seul lot. Des réductions sont appliquées dès 3 lots commandés." },
]

const tiers = [
  { name: 'Basic', price: 'dès 129€', pieces: '8-12 pièces', brands: 'Multi-marques', margin: '30-50%', ideal: 'Débuter', highlighted: false },
  { name: 'Premium', price: 'dès 189€', pieces: '10-15 pièces', brands: 'Nike, Adidas, TNF', margin: '50-80%', ideal: 'Développer', highlighted: true },
  { name: 'Luxury', price: 'dès 349€', pieces: '6-8 pièces', brands: 'Burberry, Tommy, CK', margin: '80-120%', ideal: 'Maximiser', highlighted: false },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <main className="bg-transparent overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden min-h-[80vh] md:min-h-screen flex items-center">
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
              <Link href="/produits" className="text-black px-8 py-4 font-black text-sm uppercase tracking-widest text-center transition-all hover:opacity-90 rounded" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                VOIR NOS LOTS →
              </Link>
              <Link href="/a-propos" className="border border-white/20 text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:border-white/50 transition-colors text-center rounded">
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
      <section className="border-y border-white/10 py-6 md:py-8" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-white/10">
            {[
              { emoji: '🚚', title: 'Expédition rapide', sub: 'Depuis la Moselle' },
              { emoji: '✋', title: 'Sélection manuelle', sub: 'Qualité contrôlée' },
              { emoji: '💰', title: 'Prix compétitifs', sub: 'Bonnes marges revente' },
              { emoji: '🤝', title: 'Service sérieux', sub: 'Confiance & transparence' },
            ].map((item) => (
              <div key={item.title} className="text-center px-4 py-2
