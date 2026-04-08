import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <div className="bg-overlay-light rounded p-10 md:p-16 border border-white/10">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-bold">ACA Wholesale</p>
          <h2 className="text-2xl md:text-5xl font-black uppercase text-white mb-4 leading-tight">
            Prêt à développer<br />votre activité ?
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-xl mx-auto">
            Accédez à des lots de vêtements de marque sélectionnés avec soin, expédiés rapidement depuis la France.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/produits"
              className="bg-gold-gradient inline-block text-black px-8 md:px-10 py-4 font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
            >
              VOIR NOS LOTS →
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-white/20 text-white px-8 md:px-10 py-4 font-bold text-sm uppercase tracking-widest hover:border-white/50 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
            >
              NOUS CONTACTER
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
