import Link from 'next/link'

export default function ProductCard({ product }) {
  const stars = Array(5).fill(0)

  return (
    <div className="product-card bg-white border border-gray-100 overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundColor: product.color || '#e5e7eb' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">{product.emoji || '📦'}</div>
              <span className="text-xs text-gray-500 font-medium">{product.brand}</span>
            </div>
          </div>
        </div>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1">
            {product.badge}
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1">
            NOUVEAU
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.description}</p>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          {stars.map((_, i) => (
            <span key={i} className={`text-xs ${i < product.rating ? 'star-filled' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{product.price}€</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice}€</span>
          )}
        </div>

        <Link
          href={`/produits`}
          className="mt-3 block text-center bg-black text-white text-sm py-2.5 font-medium hover:bg-gray-800 transition-colors"
        >
          Voir le ballot
        </Link>
      </div>
    </div>
  )
}
