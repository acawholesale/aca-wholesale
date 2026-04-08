'use client'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    title: 'Réception & Tri',
    subtitle: 'Organisez votre stock avant tout',
    content: [
      {
        heading: 'Déballer le colis',
        text: "Dès réception, ouvrez le lot dans un espace propre et dégagé. Sortez chaque pièce une par une — ne vous précipitez pas. Un premier passage rapide vous permet de saisir la composition globale du lot.",
      },
      {
        heading: 'Trier par catégorie',
        text: 'Créez des piles par type (hauts, bas, vestes, accessoires), puis par marque, et enfin par taille. Ce tri à trois niveaux vous permettra de fixer les prix par groupe homogène plutôt que pièce par pièce — un gain de temps considérable.',
      },
      {
        heading: 'Évaluer l\'état de chaque pièce',
        text: 'Examinez chaque article sous une bonne lumière : frottements, taches, accrocs, coutures décollées, fermetures défectueuses. Constituez une pile "à part" pour les pièces endommagées — elles ne sont pas perdues : certaines peuvent être mises en vente avec mention du défaut à prix réduit, d\'autres serviront à des revendeurs de pièces détachées.',
      },
    ],
    tip: 'Astuce : prenez une photo de l\'ensemble du lot étalé au sol avant de trier. Vous aurez une vue d\'ensemble utile pour vos futurs achats et pour comparer la composition des lots.',
  },
  {
    number: '02',
    title: 'Photographier',
    subtitle: 'La photo vend — pas la description',
    content: [
      {
        heading: 'Lumière naturelle avant tout',
        text: "Photographiez près d'une fenêtre, en plein jour, sans soleil direct. Évitez absolument les plafonniers qui créent des reflets jaunes ou des ombres dures. Si vous n'avez pas de bonne lumière naturelle, investissez dans un panneau LED à lumière froide (moins de 30€ — amortissable en une journée de ventes).",
      },
      {
        heading: 'Fond neutre et propre',
        text: "Un drap blanc, une moquette beige, ou un parquet clair font l'affaire. Évitez les fonds chargés ou colorés qui volent l'attention. Les acheteurs doivent voir le vêtement, pas votre salon.",
      },
      {
        heading: 'Flat lay : votre meilleur format',
        text: "Étalez le vêtement à plat, bien lissé, sans pli. Photographiez en plongée directe (caméra à la verticale, bras tendus). C'est le format standard sur Vinted, et les acheteurs s'y attendent.",
      },
      {
        heading: 'Montrez le logo et l\'étiquette',
        text: "Une photo dédiée au logo de marque (brodé, imprimé, étiquette intérieure) rassure l'acheteur sur l'authenticité. C'est ce qui justifie un prix plus élevé. Ne négligez jamais cette photo.",
      },
      {
        heading: 'Documentez les défauts',
        text: "Si une pièce a un défaut mineur (petite tache, légère décoloration), photographiez-le en gros plan et mentionnez-le dans l'annonce. La transparence protège votre réputation de vendeur et évite les litiges — elle rassure même certains acheteurs qui acceptent un défaut en échange d'un prix inférieur.",
      },
    ],
    tip: 'Conseil efficacité : fotografiez 10–15 pièces d\'affilée en une session. Préparez tout avant de commencer (fond propre, éclairage réglé, vêtements lissés) pour ne pas vous interrompre.',
  },
  {
    number: '03',
    title: 'Fixer les Prix',
    subtitle: 'Ni trop cher, ni bradé',
    content: [
      {
        heading: 'Recherchez les prix vendus sur Vinted',
        text: "Sur Vinted, filtrez par \"Articles vendus\" pour voir à combien des pièces similaires ont réellement été achetées — pas seulement mises en vente. C'est la seule donnée qui compte : le prix vendu, pas le prix affiché.",
      },
      {
        heading: 'Positionnez-vous 20 à 30% en dessous du marché',
        text: "Votre avantage concurrentiel est la rotation rapide. En vendant un peu moins cher que la concurrence, vous apparaissez en tête des résultats, générez des ventes rapides et des avis positifs. Un compte avec 50 ventes vend plus facilement qu'un compte avec 5 ventes, même à prix identique.",
      },
      {
        heading: 'Proposez des remises groupées',
        text: 'Activez l\'option "offre groupée" sur Vinted. Proposez -10% pour 2 articles, -15% pour 3 et plus. Cela augmente votre panier moyen et réduit les frais de livraison par article vendu — un gain net pour vous comme pour l\'acheteur.',
      },
      {
        heading: 'Réévaluez chaque semaine',
        text: "Un article qui stagne depuis 2 semaines doit baisser de 10 à 15%. Ne gardez pas de stock immobile — l'argent immobilisé dans des articles invendus est de l'argent qui ne travaille pas pour vous.",
      },
    ],
    tip: 'Formule simple : Prix vendu moyen sur Vinted × 0,70 = votre prix de départ. Vous pourrez toujours négocier légèrement à la baisse, donc partez de ce point.',
  },
  {
    number: '04',
    title: 'Rédiger l\'Annonce',
    subtitle: 'Le bon titre fait toute la différence',
    content: [
      {
        heading: 'Format de titre recommandé',
        text: 'Suivez ce format : [Marque] + [Type d\'article] + [Couleur/Motif] + [Taille]. Exemple : "Nike Air Jordan Hoodie Sweat à capuche Gris L". Ce format correspond exactement à ce que les acheteurs tapent dans la barre de recherche.',
      },
      {
        heading: 'Description en 3 blocs',
        text: null,
        list: [
          "État : Très bon état / Bon état / Quelques signes d'usure (soyez précis)",
          "Mesures : Tour de poitrine, longueur, tour de taille si pertinent — les tailles varient selon les marques",
          "Détails : Composition matière, type de coupe, particularités (logo brodé, coupe oversize, vintage...)",
        ],
      },
      {
        heading: 'Mots-clés pour la visibilité',
        text: "Vinted classe les annonces selon leur pertinence textuelle. Incluez dans votre description : le nom complet de la marque, le type exact d'article, le style (streetwear, casual, sport, Y2K, vintage), et la saison si applicable. Ne spammez pas — une description naturelle est préférable à une liste de mots-clés.",
      },
      {
        heading: 'Catégorie et état : soyez précis',
        text: "Choisissez la bonne catégorie (Vinted pénalise les articles mal catégorisés en les reléguant dans les résultats). Pour l'état, ne sur-estimez pas — un acheteur déçu laissera un avis négatif qui impactera toutes vos ventes futures.",
      },
    ],
    tip: 'Dupliquez vos annonces performantes. Si un hoodie Nike gris L se vend bien, votre annonce pour un hoodie Nike noir L devrait suivre le même format — copiez, ajustez, publiez.',
  },
  {
    number: '05',
    title: 'Expédier',
    subtitle: 'Vite, propre, sans litige',
    content: [
      {
        heading: 'Utilisez les étiquettes Vinted',
        text: "Vinted génère automatiquement les étiquettes d'expédition lorsqu'une vente est confirmée. Vous n'avez qu'à imprimer l'étiquette et déposer le colis chez le transporteur partenaire (Mondial Relay, Colissimo, Chronopost selon l'option choisie par l'acheteur). Pas de négociation de tarifs, pas de démarches — c'est intégré.",
      },
      {
        heading: 'Emballage propre et solide',
        text: "Pliez soigneusement le vêtement, glissez-le dans un sac plastique ou papier de protection, puis dans une enveloppe bulles ou une boîte selon le volume. Un colis bien emballé évite les dommages de transport et les litiges. Un client qui reçoit un article plié proprement dans du papier de soie sera positivement surpris — et vous laissera probablement 5 étoiles.",
      },
      {
        heading: 'Délai d\'expédition',
        text: "Expédiez dans les 48h ouvrées après confirmation de la vente. Vinted surveille vos délais d'expédition — un mauvais indicateur pénalise votre visibilité. Si vous ne pouvez pas expédier rapidement (voyage, imprévu), activez le mode vacances dans vos paramètres.",
      },
      {
        heading: 'Confirmation et suivi',
        text: "Une fois le colis expédié, marquez-le comme envoyé sur Vinted et partagez le numéro de suivi si disponible. L'acheteur sera notifié et pourra suivre son colis — réduisant ainsi les messages d'inquiétude et les potentiels litiges.",
      },
    ],
    tip: 'Gardez un stock de fournitures d\'expédition (enveloppes bulles, sacs plastique, scotch renforcé) en quantité. Commander en lot sur Amazon ou Leboncoin revient bien moins cher qu\'en petite quantité.',
  },
]

const marginTiers = [
  {
    tier: 'Lot Basic',
    priceRange: '49€ – 89€',
    margin: '30 – 50%',
    details: 'Idéal pour débuter. Marges plus modestes mais volume plus élevé. Parfait pour construire vos premiers avis et rodez votre process.',
    color: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(255,255,255,0.12)',
    labelColor: '#888',
  },
  {
    tier: 'Lot Premium',
    priceRange: '89€ – 179€',
    margin: '50 – 80%',
    details: 'Le meilleur ratio rendement/effort. Des marques plus recherchées, des pièces qui partent vite sur Vinted. Recommandé dès votre deuxième commande.',
    color: 'rgba(196,150,42,0.08)',
    borderColor: 'rgba(196,150,42,0.35)',
    labelColor: '#C4962A',
    featured: true,
  },
  {
    tier: 'Lot Luxury',
    priceRange: '179€ – 349€',
    margin: '80 – 120%',
    details: 'Marges maximales, mais nécessite une certaine expérience pour bien fixer les prix et cibler les bons acheteurs. Réservé aux revendeurs confirmés.',
    color: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,255,255,0.10)',
    labelColor: '#888',
  },
]

export default function CommentRevendre() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '64px 24px 52px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
        <div id="main-content" tabIndex={-1} style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px' }}>
            Guide Revendeur
          </p>
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(26px, 5vw, 52px)', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 16px 0', lineHeight: '1.1' }}>
            Comment Revendre vos Lots sur Vinted
          </h1>
          <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.7', maxWidth: '580px', margin: '0 auto 28px' }}>
            Vous venez de recevoir votre lot ACA Wholesale et vous ne savez pas par où commencer ? Ce guide couvre chaque étape — du déballage jusqu'à l'expédition — pour que vous puissiez revendre sereinement et rentablement.
          </p>
          {/* Step badges preview */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
            {['Tri', 'Photos', 'Prix', 'Annonce', 'Expédition'].map((label, i) => (
              <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '12px', color: '#aaa', fontWeight: 500 }}>
                <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '9px', fontWeight: 900, flexShrink: 0 }}>
                  {i + 1}
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {steps.map((step) => (
            <article key={step.number} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden' }}>
              {/* Step header */}
              <div style={{ padding: '28px 32px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '14px', fontWeight: 900, flexShrink: 0, letterSpacing: '-0.5px' }}>
                  {step.number}
                </div>
                <div>
                  <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2.5px', margin: '0 0 4px 0' }}>
                    Étape {parseInt(step.number, 10)}
                  </p>
                  <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(18px, 3vw, 24px)', margin: '0 0 4px 0', lineHeight: '1.2' }}>
                    {step.title}
                  </h2>
                  <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>{step.subtitle}</p>
                </div>
              </div>

              {/* Step body */}
              <div style={{ padding: '28px 32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  {step.content.map((block) => (
                    <div key={block.heading}>
                      <h3 style={{ color: '#E8B84B', fontWeight: 700, fontSize: '13px', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {block.heading}
                      </h3>
                      {block.text && (
                        <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.75', margin: 0 }}>
                          {block.text}
                        </p>
                      )}
                      {block.list && (
                        <ul style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {block.list.map((item) => (
                            <li key={item} style={{ color: '#888', fontSize: '14px', lineHeight: '1.65' }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tip box */}
                {step.tip && (
                  <div style={{ marginTop: '24px', padding: '16px 20px', background: 'rgba(196,150,42,0.07)', border: '1px solid rgba(196,150,42,0.25)', borderRadius: '10px', borderLeft: '3px solid #C4962A' }}>
                    <p style={{ color: '#C4962A', fontSize: '13px', lineHeight: '1.65', margin: 0 }}>
                      {step.tip}
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Calculateur de Marge */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
              Rentabilité estimée
            </p>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(22px, 4vw, 36px)', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 12px 0' }}>
              Calculateur de Marge
            </h2>
            <p style={{ color: '#666', fontSize: '14px', maxWidth: '520px', margin: '0 auto' }}>
              Ces marges sont estimées sur la base de nos revendeurs actifs. Elles varient selon votre capacité à fixer les bons prix, le temps consacré à la vente, et la qualité de vos photos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {marginTiers.map((tier) => (
              <div key={tier.tier} style={{ background: tier.color, border: `1px solid ${tier.borderColor}`, borderRadius: '16px', padding: '28px 24px', position: 'relative', overflow: 'hidden' }}>
                {tier.featured && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '3px 10px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', borderRadius: '999px', fontSize: '9px', fontWeight: 900, color: '#000', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Recommandé
                  </div>
                )}
                <p style={{ color: tier.labelColor, fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 8px 0' }}>
                  {tier.tier}
                </p>
                <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 16px 0' }}>
                  Investissement : <strong style={{ color: '#ddd' }}>{tier.priceRange}</strong>
                </p>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: tier.featured ? '#E8B84B' : '#fff', lineHeight: 1 }}>
                    {tier.margin}
                  </span>
                  <span style={{ color: '#666', fontSize: '14px', marginLeft: '4px' }}>de marge</span>
                </div>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.65', margin: 0 }}>
                  {tier.details}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p style={{ textAlign: 'center', color: '#444', fontSize: '11px', marginTop: '20px', fontStyle: 'italic' }}>
            Marges calculées sur la base du prix de revente moyen constaté sur Vinted, après déduction des frais de plateforme (5%) et des frais d'expédition. Résultats non garantis — dépendent de votre exécution.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px' }}>
            Vous êtes prêt
          </p>
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(22px, 4vw, 36px)', margin: '0 0 14px 0', lineHeight: '1.2' }}>
            Prêt à commencer ?
          </h2>
          <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.7', margin: '0 0 32px 0' }}>
            Vous avez maintenant toutes les clés pour revendre intelligemment. Il ne reste plus qu'à choisir votre premier lot et mettre en pratique.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            <Link
              href="/produits"
              style={{ display: 'inline-block', padding: '14px 32px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '8px', textDecoration: 'none' }}
            >
              Découvrez nos lots
            </Link>
            <Link
              href="/faq"
              style={{ display: 'inline-block', padding: '14px 32px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '8px', textDecoration: 'none' }}
            >
              Consulter la FAQ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
