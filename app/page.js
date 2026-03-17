{/* ── COMPARATIF ── */}
      <section className="py-12 md:py-20 border-b border-white/10 fade-up">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="inline-block text-[10px] font-black px-2 py-0.5 uppercase tracking-widest mb-3 rounded-sm" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }}>COMPARATIF</span>
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white">Quel lot choisir ?</h2>
            <p className="text-gray-500 text-sm mt-2">Comparez nos gammes pour trouver celle qui correspond à votre activité</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                tier: 'Entrée de gamme',
                name: 'Basic',
                emoji: '👕',
                price: 'dès 129€',
                pieces: '15-20 pièces',
                brands: 'Multi-marques',
                margin: '×2 à ×3',
                ideal: 'Débuter sur Vinted',
                color: '#555',
                highlight: false,
              },
              {
                tier: 'Le plus populaire',
                name: 'Premium',
                emoji: '🔥',
                price: 'dès 189€',
                pieces: '10-15 pièces',
                brands: 'Nike, Adidas, TNF…',
                margin: '×3 à ×4',
                ideal: 'Revendeurs actifs',
                color: '#C4962A',
                highlight: true,
              },
              {
                tier: 'Maximum rentabilité',
                name: 'Luxury',
                emoji: '💎',
                price: 'dès 349€',
                pieces: '6-8 pièces',
                brands: 'Burberry, CK, Tommy…',
                margin: '×4 à ×6',
                ideal: 'Revendeurs exigeants',
                color: '#E8B84B',
                highlight: false,
              },
            ].map((tier, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1" style={{ background: tier.highlight ? 'rgba(196,150,42,0.08)' : 'rgba(255,255,255,0.04)', borderColor: tier.highlight ? '#C4962A' : 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
                {tier.highlight && (
                  <div className="py-1.5 text-center text-[10px] font-black uppercase tracking-widest text-black" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                    ⭐ Le plus populaire
                  </div>
                )}
                <div className="p-6">
                  <div className="text-3xl mb-3">{tier.emoji}</div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: tier.color }}>{tier.tier}</div>
                  <h3 className="text-xl font-black text-white mb-4">Lot {tier.name}</h3>
                  <div className="space-y-3 mb-6">
                    {[
                      { label: 'Prix', value: tier.price },
                      { label: 'Pièces', value: tier.pieces },
                      { label: 'Marques', value: tier.brands },
                      { label: 'Marge estimée', value: tier.margin },
                      { label: 'Idéal pour', value: tier.ideal },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-gray-500 text-xs uppercase tracking-wide">{row.label}</span>
                        <span className="font-bold text-white text-xs">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/produits" className="block w-full text-center py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:opacity-90" style={tier.highlight ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                    Voir les lots →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
