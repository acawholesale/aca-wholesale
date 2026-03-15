import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function APropos() {
  return (
    <main className="bg-[#f0f0f3]">
      <Navbar />

      {/* Hero */}
      <section className="bg-black text-white py-20 rounded-b-[40px]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">À PROPOS D&apos;ACA WHOLESALE</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Votre fournisseur de confiance en lots de vêtements de seconde main, basé en Moselle
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-3xl p-10" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
              <div className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">Notre Histoire</div>
              <h2 className="text-3xl font-black mb-6">Née de l&apos;expérience directe dans la revente</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                ACA Wholesale est né de notre expérience directe dans la revente de vêtements de seconde main. En travaillant dans ce domaine, nous avons rapidement compris que beaucoup de revendeurs avaient du mal à trouver des fournisseurs fiables proposant des produits de qualité constante.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous avons donc décidé de créer une solution simple : proposer des lots sélectionnés avec soin, pensés pour la revente.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Notre objectif est simple : permettre à nos clients d&apos;accéder à des produits fiables, à des prix compétitifs, avec une livraison rapide depuis la France.
              </p>
            </div>
            <div className="bg-white rounded-3xl aspect-square flex items-center justify-center" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
              <div className="text-center">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 font-medium">Notre Entrepôt</p>
                <p className="text-gray-400 text-sm">Moselle, France</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
            <div className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">Qui sommes-nous ?</div>
            <h2 className="text-3xl font-black mb-6">Une équipe passionnée par la seconde main</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto text-lg">
              Nous sommes une équipe basée en Moselle, passionnée par la seconde main et l&apos;entrepreneuriat. Notre objectif est d&apos;aider les revendeurs à se développer en leur donnant accès à des produits fiables et prêts à être revendus.
            </p>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-3">NOS VALEURS</h2>
            <p className="text-gray-500">Ce qui guide notre travail au quotidien</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '✅', title: 'Qualité', desc: 'Chaque lot est sélectionné avec attention afin d\'offrir des articles en bon état et avec un réel potentiel de revente. Nous écartons systématiquement les pièces abîmées.' },
              { emoji: '🔍', title: 'Transparence', desc: 'Nous croyons en une relation honnête avec nos clients. Vous savez exactement ce que vous achetez, sans mauvaise surprise.' },
              { emoji: '🤝', title: 'Confiance', desc: 'Notre objectif est de créer une relation de confiance durable avec nos clients et de leur proposer des lots qu\'ils peuvent revendre facilement.' },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-3xl p-10 text-center" style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -6px -6px 14px rgba(255,255,255,0.8)' }}>
                <div className="text-4xl mb-4">{v.emoji}</div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre vision */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-black text-white p-12 flex items-center justify-center aspect-square rounded-3xl">
              <div className="text-center">
                <div className="text-5xl mb-4">♻️</div>
                <h3 className="text-2xl font-black mb-2">Notre Vision</h3>
                <p className="text-gray-400 text-sm">Une mode plus responsable</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-10" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
              <div className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">Notre Vision</div>
              <h2 className="text-3xl font-black mb-6">Donner une seconde vie aux vêtements</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous croyons au développement de la seconde main et à une consommation plus responsable. À travers notre activité, nous souhaitons faciliter l&apos;accès à des vêtements de qualité pour les revendeurs tout en participant à donner une seconde vie aux produits.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chaque pièce revendue, c&apos;est un vêtement de moins qui finit à la poubelle. Ensemble, nous contribuons à une mode plus durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-3">POURQUOI NOUS CHOISIR ?</h2>
            <p className="text-gray-500">Ce qui fait notre différence</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🔎', title: 'Sélection rigoureuse', desc: 'Chaque pièce est vérifiée et sélectionnée pour sa qualité et son potentiel de revente.' },
              { emoji: '🚚', title: 'Expédition rapide', desc: 'Nous expédions directement depuis la Moselle pour des livraisons rapides en France.' },
              { emoji: '📱', title: 'Pensé pour Vinted', desc: 'Nos lots sont composés pour les revendeurs qui souhaitent revendre à la pièce.' },
              { emoji: '💬', title: 'Service réactif', desc: 'Une question ? Notre équipe vous répond rapidement pour vous accompagner.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white rounded-2xl text-center" style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -6px -6px 14px rgba(255,255,255,0.8)' }}>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black text-white py-16 rounded-[40px] mx-4 my-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '🇫🇷', label: 'Basé en Moselle' },
              { num: '✋', label: 'Sélection manuelle' },
              { num: '♻️', label: 'Seconde main' },
              { num: '🚚', label: 'Expédition rapide' },
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
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
            <h2 className="text-3xl font-black mb-4">Envie de travailler avec nous ?</h2>
            <p className="text-gray-500 mb-8">Découvrez nos lots ou contactez-nous pour un devis personnalisé.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/produits" className="bg-black text-white px-8 py-3 font-bold text-sm hover:bg-gray-800 transition-colors rounded-full">
                VOIR NOS LOTS
              </Link>
              <Link href="/contact" className="border-2 border-black px-8 py-3 font-bold text-sm hover:bg-black hover:text-white transition-colors rounded-full">
                NOUS CONTACTER
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
