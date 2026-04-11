import Link from 'next/link'

const tiers = [
  {
    name: 'Basic',
    price: 'dès 129€',
    pieces: '8-12 pièces',
    brands: 'Multi-marques',
    margin: '30-50%',
    ideal: 'Débuter',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: 'dès 189€',
    pieces: '10-15 pièces',
    brands: 'Nike, Adidas, TNF',
    margin: '50-80%',
    ideal: 'Développer',
    highlighted: true,
  },
  {
    name: 'Luxury',
    price: 'dès 349€',
    pieces: '6-8 pièces',
    brands: 'Burberry, Tommy, CK',
    margin: '80-120%',
    ideal: 'Maximiser',
    highlighted: false,
  },
]

export default function ComparisonTable() {
  return (
    <section className="py-12 md:py-20 border-b border-white/10">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="bg-gold-gradient inline-block text-[10px] font-black px-2 py-0.5 uppercase tracking-widest mb-3 rounded-sm text-black">
            Nos gammes
          </span>
          <h2 className="text-2xl md:text-4xl font-black uppercase text-white mb-2">CHOISISSEZ VOTRE NIVEAU</h2>
          <p className="text-gray-300 text-sm">Des lots adaptés à chaque type de revendeur</p>
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
              {/* Tier header — background is fully dynamic (gold gradient vs dark), kept as inline style */}
              <div
                className="p-2 md:p-5 text-center"
                style={tier.highlighted
                  ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }
                  : { background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {tier.highlighted && (
                  <div className="text-[10px] font-black text-black/70 uppercase tracking-widest mb-1">⭐ Le plus populaire</div>
                )}
                <div className={`font-black text-xs md:text-base uppercase tracking-wide ${tier.highlighted ? 'text-black' : 'text-white'}`}>{tier.name}</div>
                <div className={`font-black text-base md:text-2xl ${tier.highlighted ? 'text-black' : 'text-white'}`}>{tier.price}</div>
              </div>

              {/* Tier rows */}
              {[
                { label: 'Pièces', val: tier.pieces },
                { label: 'Marques', val: tier.brands },
                { label: 'Marge est.', val: tier.margin },
                { label: 'Idéal pour', val: tier.ideal },
              ].map((row) => (
                <div
                  key={row.label}
                  className="px-3 py-3 text-center"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="text-[10px] text-gray-300 uppercase tracking-wide mb-0.5">{row.label}</div>
                  <div className={`text-xs font-bold ${tier.highlighted ? 'text-gold-light' : 'text-white'}`}>{row.val}</div>
                </div>
              ))}

              {/* CTA button — dynamic style based on highlighted state, kept as inline */}
              <div className="p-3 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <Link
                  href="/produits"
                  className="block text-center text-xs font-black py-2.5 rounded uppercase tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1"
                  style={tier.highlighted
                    ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }
                    : { border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }
                  }
                >
                  Voir les lots →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
