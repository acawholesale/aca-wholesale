import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function APropos() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">À PROPOS D&apos;ACA WHOLESALE</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Votre partenaire de confiance pour les ballots de vêtements de marque
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">Notre Histoire</div>
              <h2 className="text-3xl font-black mb-6">Née de la passion pour la mode vintage et streetwear</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                ACA Wholesale est née d&apos;une passion pour la mode et d&apos;un constat simple : il est difficile de trouver des vêtements de marque de qualité à des prix accessibles pour les revendeurs.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Notre équipe sélectionne chaque pièce à la main pour garantir une qualité irréprochable. Nous travaillons directement avec les meilleures sources en Europe pour vous offrir les meilleurs prix du marché.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Aujourd&apos;hui, nous sommes fiers de fournir plus de 2000 revendeurs à travers la France et l&apos;Europe.
              </p>
            </div>
            <div className="bg-gray-100 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 font-medium">Notre Entrepôt</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-3">NOS VALEURS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '✅', title: 'Qualité', desc: 'Chaque pièce est inspectée et triée à la main. Nous garantissons des vêtements en excellent état.' },
              { emoji: '💰', title: 'Prix Justes', desc: 'Nous négocions les meilleurs tarifs pour vous offrir des marges confortables sur chaque ballot.' },
              { emoji: '🤝', title: 'Confiance', desc: 'Transparence totale sur la composition des ballots. Satisfaction garantie ou échange.' },
            ].map((v) => (
              <div key={v.title} className="bg-white p-10 border text-center">
                <div className="text-4xl mb-4">{v.emoji}</div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '10K+', label: 'Ballots vendus' },
              { num: '2000+', label: 'Clients satisfaits' },
              { num: '500+', label: 'Avis 5 étoiles' },
              { num: '48h', label: 'Délai d\'expédition' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-black text-blue-500">{s.num}</div>
                <div className="text-gray-400 text-sm mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Envie de travailler avec nous ?</h2>
          <p className="text-gray-500 mb-8">Découvrez nos ballots ou contactez-nous pour un devis personnalisé.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/produits" className="bg-black text-white px-8 py-3 font-bold text-sm hover:bg-gray-800 transition-colors">
              VOIR NOS BALLOTS
            </Link>
            <Link href="/contact" className="border-2 border-black px-8 py-3 font-bold text-sm hover:bg-black hover:text-white transition-colors">
              NOUS CONTACTER
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
