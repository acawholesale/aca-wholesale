import Link from 'next/link'

const categories = [
  { name: 'Sweats & Hoodies', count: 3, emoji: '🧥', id: 'sweats' },
  { name: 'T-Shirts', count: 3, emoji: '👕', id: 'tshirts' },
  { name: 'Doudounes', count: 2, emoji: '🏔️', id: 'doudounes' },
  { name: 'Jeans', count: 2, emoji: '👖', id: 'jeans' },
  { name: 'Sportswear', count: 2, emoji: '🏃', id: 'sportswear' },
  { name: 'Luxury', count: 1, emoji: '💎', id: 'luxury' },
]

export default function CategoriesSection() {
  return (
    <section className="py-12 md:py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-end justify-between mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase text-white">CATÉGORIES</h2>
          <Link href="/produits" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded">
            SHOP ALL →
          </Link>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/produits"
              className="glass-card group text-center p-4 md:p-6 hover:border-gold-medium transition-all duration-300 rounded cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded"
            >
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">{cat.emoji}</div>
              <h3 className="font-bold text-[10px] md:text-xs mb-0.5 text-white uppercase tracking-wide">{cat.name}</h3>
              <p className="text-[10px] text-gray-400">{cat.count} lots</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
