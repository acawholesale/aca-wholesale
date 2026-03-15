import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white rounded-t-[40px]">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h3 className="text-2xl font-bold mb-2">Rejoignez la famille ACA Wholesale</h3>
          <p className="text-gray-400 mb-6 text-sm">
            Recevez nos offres exclusives et soyez informé des nouveaux arrivages
          </p>
          <form className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 rounded-full"
            />
            <button className="bg-white text-black px-6 py-3 font-semibold text-sm hover:bg-gray-200 transition-colors rounded-full">
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white text-black px-3 py-1.5 font-black text-xl tracking-tighter rounded-xl">
                ACA
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide">
                Wholesale
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Grossiste en lots de vêtements de seconde main basé en Moselle.
              Des lots sélectionnés avec soin, pensés pour les revendeurs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/produits" className="text-gray-400 text-sm hover:text-white transition-colors">Nos Lots</Link></li>
              <li><Link href="/a-propos" className="text-gray-400 text-sm hover:text-white transition-colors">À Propos</Link></li>
              <li><Link href="/faq" className="text-gray-400 text-sm hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 text-sm hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📧 contact@aca-wholesale.com</li>
              <li>💬 @aca.wholesale</li>
              <li>📍 Moselle, France</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Suivez-nous</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors rounded-full">
                <span className="text-sm">IG</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors rounded-full">
                <span className="text-sm">TT</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors rounded-full">
                <span className="text-sm">FB</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-xs">
          © 2026 ACA Wholesale. Tous droits réservés. Basé en Moselle, France.
        </div>
      </div>
    </footer>
  )
}
