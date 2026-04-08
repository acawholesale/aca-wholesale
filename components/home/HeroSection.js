'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

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

export default function HeroSection() {
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
    <section className="relative text-white overflow-hidden min-h-[80vh] md:min-h-screen flex items-center">
      {/* Background grid texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Gold glow — no Tailwind equivalent for radial-gradient with color stop, kept as-is */}
      <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 opacity-10 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #C4962A, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-5 py-20 md:py-32 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-white/20 text-gray-400 text-[10px] font-bold px-3 py-1.5 mb-6 uppercase tracking-widest rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
            Grossiste • Moselle, France
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight uppercase">
            LOTS DE<br />
            <span className="text-gold">VÊTEMENTS</span><br />
            DE SECONDE<br />
            MAIN
          </h1>
          <p className="text-gray-400 text-sm md:text-lg mb-8 leading-relaxed max-w-lg">
            Des lots sélectionnés avec soin, pensés pour la revente.
            Nike, Adidas, The North Face, Ralph Lauren…
            Expédition rapide depuis la France.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/produits"
              className="bg-gold-gradient text-black px-8 py-4 font-black text-sm uppercase tracking-widest text-center transition-all hover:opacity-90 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
            >
              VOIR NOS LOTS →
            </Link>
            <Link
              href="/a-propos"
              className="border border-white/20 text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:border-white/50 transition-colors text-center rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
            >
              QUI SOMMES-NOUS ?
            </Link>
          </div>

          {/* Stats bar - animated counters */}
          <div ref={statsRef} className="flex gap-6 md:gap-10 mt-12 pt-12 border-t border-white/10">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-black text-gold-light">{c1}+</div>
              <div className="text-gray-400 text-[9px] md:text-xs mt-1 uppercase tracking-wide">Revendeurs</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-black text-gold-light">{c2}</div>
              <div className="text-gray-400 text-[9px] md:text-xs mt-1 uppercase tracking-wide">Lots dispos</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-black text-gold-light">{c3}h</div>
              <div className="text-gray-400 text-[9px] md:text-xs mt-1 uppercase tracking-wide">Réponse max</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-black text-gold-light">{c4}%</div>
              <div className="text-gray-400 text-[9px] md:text-xs mt-1 uppercase tracking-wide">Authentique</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
