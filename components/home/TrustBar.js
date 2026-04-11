const trustItems = [
  { emoji: '🚚', title: 'Expédition rapide', sub: 'Depuis la Moselle' },
  { emoji: '✋', title: 'Sélection manuelle', sub: 'Qualité contrôlée' },
  { emoji: '💰', title: 'Prix compétitifs', sub: 'Bonnes marges revente' },
  { emoji: '🤝', title: 'Service sérieux', sub: 'Confiance & transparence' },
]

export default function TrustBar() {
  return (
    <section className="bg-overlay-light border-y border-white/10 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-white/10">
          {trustItems.map((item) => (
            <div key={item.title} className="text-center px-4 py-2">
              <div className="text-xl md:text-2xl mb-1">{item.emoji}</div>
              <div className="font-bold text-xs md:text-sm text-white uppercase tracking-wide">{item.title}</div>
              <div className="text-[10px] md:text-xs text-gray-300 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
