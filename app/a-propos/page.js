'use client'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function APropos() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '60px 24px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
        <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>Moselle, France</p>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(26px, 5vw, 52px)', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 12px 0' }}>À PROPOS D&apos;ACA WHOLESALE</h1>
        <p style={{ color: '#555', fontSize: '15px', maxWidth: '520px', margin: '0 auto' }}>Votre fournisseur de confiance en lots de vêtements de seconde main, basé en Moselle</p>
      </section>

      {/* Notre histoire */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'center' }}>
          <div style={{ background: '#111', border: '1px solid rgba(196,150,42,0.2)', borderRadius: '16px', padding: '36px' }}>
            <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Notre Histoire</p>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '22px', margin: '0 0 16px 0', lineHeight: '1.3' }}>Née de l&apos;expérience directe dans la revente</h2>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.75', margin: '0 0 12px 0' }}>
              ACA Wholesale est né de notre expérience directe dans la revente de vêtements de seconde main. En travaillant dans ce domaine, nous avons rapidement compris que beaucoup de revendeurs avaient du mal à trouver des fournisseurs fiables proposant des produits de qualité constante.
            </p>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.75', margin: '0 0 12px 0' }}>
              Nous avons donc décidé de créer une solution simple : proposer des lots sélectionnés avec soin, pensés pour la revente.
            </p>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.75', margin: 0 }}>
              Notre objectif est simple : permettre à nos clients d&apos;accéder à des produits fiables, à des prix compétitifs, avec une livraison rapide depuis la France.
            </p>
          </div>
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '280px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '12px' }}>📦</div>
              <p style={{ color: '#555', fontWeight: 600, fontSize: '14px', margin: '0 0 4px 0' }}>Notre Entrepôt</p>
              <p style={{ color: '#444', fontSize: '12px', margin: 0 }}>Moselle, France</p>
            </div>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '56px 24px', textAlign: 'center' }}>
          <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Qui sommes-nous ?</p>
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '24px', margin: '0 0 16px 0' }}>Une équipe passionnée par la seconde main</h2>
          <p style={{ color: '#888', fontSize: '15px', lineHeight: '1.75', margin: 0 }}>
            Nous sommes une équipe basée en Moselle, passionnée par la seconde main et l&apos;entrepreneuriat. Notre objectif est d&apos;aider les revendeurs à se développer en leur donnant accès à des produits fiables et prêts à être revendus.
          </p>
        </div>
      </section>

      {/* Nos valeurs */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 8px 0' }}>NOS VALEURS</h2>
          <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>Ce qui guide notre travail au quotidien</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {[
            { emoji: '✅', title: 'Qualité', desc: "Chaque lot est sélectionné avec attention afin d'offrir des articles en bon état et avec un réel potentiel de revente." },
            { emoji: '🔍', title: 'Transparence', desc: "Nous croyons en une relation honnête avec nos clients. Vous savez exactement ce que vous achetez." },
            { emoji: '🤝', title: 'Confiance', desc: "Notre objectif est de créer une relation de confiance durable avec nos clients." },
          ].map((v) => (
            <div key={v.title} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '28px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{v.emoji}</div>
              <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '16px', margin: '0 0 8px 0' }}>{v.title}</h3>
              <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.65', margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Notre vision */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'center' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(196,150,42,0.15), rgba(232,184,75,0.08))', border: '1px solid rgba(196,150,42,0.3)', borderRadius: '16px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '240px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '56px', marginBottom: '12px' }}>♻️</div>
                <h3 style={{ color: '#E8B84B', fontWeight: 900, fontSize: '18px', margin: '0 0 6px 0' }}>Notre Vision</h3>
                <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>Une mode plus responsable</p>
              </div>
            </div>
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '36px' }}>
              <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Notre Vision</p>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '22px', margin: '0 0 16px 0', lineHeight: '1.3' }}>Donner une seconde vie aux vêtements</h2>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.75', margin: '0 0 12px 0' }}>
                Nous croyons au développement de la seconde main et à une consommation plus responsable. À travers notre activité, nous souhaitons faciliter l&apos;accès à des vêtements de qualité pour les revendeurs tout en participant à donner une seconde vie aux produits.
              </p>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.75', margin: 0 }}>
                Chaque pièce revendue, c&apos;est un vêtement de moins qui finit à la poubelle. Ensemble, nous contribuons à une mode plus durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 8px 0' }}>POURQUOI NOUS CHOISIR ?</h2>
            <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>Ce qui fait notre différence</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {[
              { emoji: '🔎', title: 'Sélection rigoureuse', desc: 'Chaque pièce est vérifiée pour sa qualité.' },
              { emoji: '🚚', title: 'Expédition rapide', desc: 'Livraisons rapides depuis la Moselle.' },
              { emoji: '📱', title: 'Pensé pour Vinted', desc: 'Lots composés pour la revente à la pièce.' },
              { emoji: '💬', title: 'Service réactif', desc: 'On vous répond rapidement.' },
            ].map((item) => (
              <div key={item.title} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.emoji}</div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '13px', margin: '0 0 6px 0' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '12px', lineHeight: '1.5', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '24px', margin: '0 0 10px 0' }}>Envie de travailler avec nous ?</h2>
          <p style={{ color: '#555', fontSize: '14px', margin: '0 0 28px 0' }}>Découvrez nos lots ou contactez-nous pour un devis personnalisé.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            <Link href="/produits" style={{ padding: '13px 28px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '8px', textDecoration: 'none' }}>
              Voir nos lots
            </Link>
            <Link href="/contact" style={{ padding: '13px 28px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '8px', textDecoration: 'none' }}>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
