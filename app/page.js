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
                  <div className="text-lg
