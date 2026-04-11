import Link from 'next/link'

const checkItems = [
  'Sélection rigoureuse des produits',
  'Expédition rapide depuis la France',
  'Lots pensés pour la revente sur Vinted',
  'Relation de confiance durable',
]

const warehouseFeatures = [
  { emoji: '✋', text: 'Tri manuel' },
  { emoji: '🔍', text: 'Contrôle qualité' },
  { emoji: '📏', text: 'Tailles variées' },
  { emoji: '🚚', text: 'Envoi rapide' },
]

export default function WhyUsSection() {
  return (
    <section className="py-12 md:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-px rounded overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div className="bg-overlay-dark p-6 md:p-12">
            <div className="text-xs font-black uppercase tracking-widest mb-3 text-gold">Pourquoi ACA Wholesale ?</div>
            <h2 className="text-xl md:text-3xl font-black text-white mb-6 uppercase leading-tight">Un fournisseur fiable, pensé pour les revendeurs</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              Après plusieurs années dans la revente de vêtements, nous avons créé ACA Wholesale pour répondre à un vrai besoin : proposer aux revendeurs des lots de qualité, sélectionnés avec soin, avec un bon potentiel de revente.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Basés en Moselle, nous travaillons chaque jour pour offrir un service sérieux, transparent et efficace.
            </p>
            <div className="space-y-2 mb-8">
              {checkItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="bg-gold-gradient w-5 h-5 flex items-center justify-center text-[10px] font-black flex-shrink-0 rounded-sm text-black">✓</span>
                  <span className="text-xs md:text-sm font-medium text-gray-300">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/a-propos" className="inline-block border border-white/20 text-white px-6 py-2.5 font-bold text-xs uppercase tracking-widest hover:border-white/50 transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white">
              En savoir plus →
            </Link>
          </div>
          <div className="p-6 md:p-12 flex items-center justify-center min-h-[300px]" style={{ background: 'rgba(0,0,0,0.35)' }}>
            <div className="text-center">
              <div className="text-6xl mb-6">📦</div>
              <p className="text-white font-black text-lg uppercase">Notre entrepôt en Moselle</p>
              <p className="text-gray-300 text-sm mt-2">Tri, sélection et expédition depuis la France</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {warehouseFeatures.map((b) => (
                  <div key={b.text} className="glass-card rounded-md p-3 text-center">
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
  )
}
