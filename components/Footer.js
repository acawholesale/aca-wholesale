import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black text-white rounded-t-[24px] md:rounded-t-[40px]">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-5 py-10 md:py-12 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Rejoignez la famille ACA Wholesale</h3>
          <p className="text-gray-400 mb-5 md:mb-6 text-xs md:text-sm">
            Recevez nos offres exclusives et soyez informé des nouveaux arrivages
          </p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none rounded-full"
              onFocus={(e) => e.target.style.borderColor = '#C4962A'}
              onBlur={(e) => e.target.style.borderColor = '#374151'}
            />
            <button
              className="text-white px-6 py-3 font-semibold text-sm transition-all rounded-full"
              style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="ACA Wholesale"
                width={120}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Grossiste en lots de vêtements de seconde main basé en Moselle.
              Des lots sélectionnés avec soin, pensés pour les revendeurs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="font-bold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4"
              style={{ color: '#C4962A' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 text-xs md:text-sm hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/produits" className="text-gray-400 text-xs md:text-sm hover:text-white transition-colors">Nos Lots</Link></li>
              <li><Link href="/a-propos" className="text-gray-400 text-xs md:text-sm hover:text-white transition-colors">À Propos</Link></li>
              <li><Link href="/faq" className="text-gray-400 text-xs md:text-sm hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 text-xs md:text-sm hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4"
              style={{ color: '#C4962A' }}
            >
              Contact
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs md:text-sm">
              <li>📧 contact@aca-wholesale.com</li>
              <li>💬 @aca.wholesale</li>
              <li>📍 Moselle, France</li>
            </ul>
            <div className="flex gap-3 mt-4 md:hidden">
              <a href="#" className="w-9 h-9 bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors rounded-full">
                <span className="text-xs">IG</span>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors rounded-full">
                <span className="text-xs">TT</span>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors rounded-full">
                <span className="text-xs">FB</span>
              </a>
            </div>
          </div>

          {/* Social - desktop only */}
          <div className="hidden md:block">
            <h4
              className="font-bold text-sm uppercase tracking-wider mb-4"
              style={{ color: '#C4962A' }}
            >
              Suivez-nous
            </h4>
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
        <div className="max-w-7xl mx-auto px-5 py-5 md:py-6 text-center text-gray-500 text-[10px] md:text-xs">
          © 2026 ACA Wholesale. Tous droits réservés. Basé en{' '}
          <span style={{ color: '#C4962A' }}>Moselle, France</span>.
        </div>
      </div>
    </footer>
  )
}
