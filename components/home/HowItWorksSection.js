const steps = [
  { step: '01', title: 'Choisissez votre lot', desc: 'Parcourez notre catalogue, consultez les détails de chaque lot et ajoutez-le à votre panier.', emoji: '🛒' },
  { step: '02', title: 'Passez commande', desc: 'Renseignez vos coordonnées, précisez vos préférences de tailles. Notre équipe vous contacte pour le paiement.', emoji: '📋' },
  { step: '03', title: 'Revendez à la pièce', desc: 'Recevez votre lot et revendez chaque pièce individuellement sur Vinted. Multipliez votre investissement !', emoji: '🚀' },
]

export default function HowItWorksSection() {
  return (
    <section className="py-12 md:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-black uppercase text-white mb-2">COMMENT ÇA MARCHE ?</h2>
          <p className="text-gray-300 text-sm">Commandez en 3 étapes simples</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
          {steps.map((item) => (
            <div key={item.step} className="bg-overlay-medium p-6 md:p-10 text-center">
              <div className="text-3xl md:text-4xl mb-4">{item.emoji}</div>
              <div className="text-xs font-black uppercase tracking-widest mb-2 text-gold">ÉTAPE {item.step}</div>
              <h3 className="text-base md:text-lg font-black text-white mb-3 uppercase">{item.title}</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
