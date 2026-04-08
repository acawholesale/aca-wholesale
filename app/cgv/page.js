'use client'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

const sectionStyle = {
  background: '#111',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
  padding: '32px',
  marginBottom: '16px',
}

const headingStyle = {
  color: '#E8B84B',
  fontWeight: 900,
  fontSize: '13px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  margin: '0 0 16px 0',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}

const numberBadgeStyle = {
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #C4962A, #E8B84B)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
  fontSize: '11px',
  fontWeight: 900,
  flexShrink: 0,
}

const bodyStyle = {
  color: '#888',
  fontSize: '14px',
  lineHeight: '1.75',
  margin: 0,
}

const strongStyle = {
  color: '#ccc',
  fontWeight: 600,
}

const subHeadingStyle = {
  color: '#C4962A',
  fontWeight: 700,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  margin: '20px 0 8px 0',
}

export default function CGV() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />

      {/* Header */}
      <section style={{ padding: '60px 24px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
        <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>B2B — Vente en gros</p>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(24px, 5vw, 48px)', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 12px 0' }}>CONDITIONS GÉNÉRALES<br />DE VENTE</h1>
        <p style={{ color: '#555', fontSize: '14px', maxWidth: '520px', margin: '0 auto' }}>Applicables à toute commande passée sur aca-wholesale.com entre ACA Wholesale et tout acheteur professionnel (revendeur)</p>
      </section>

      {/* Content */}
      <section id="main-content" tabIndex={-1} style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px 64px' }}>

        {/* Préambule */}
        <div style={{ ...sectionStyle, background: 'rgba(196,150,42,0.06)', border: '1px solid rgba(196,150,42,0.2)' }}>
          <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.75', margin: 0 }}>
            Les présentes Conditions Générales de Vente (CGV) régissent exclusivement les relations commerciales entre <span style={strongStyle}>ACA Wholesale</span> (ci-après &quot;le Vendeur&quot;) et tout acheteur professionnel (ci-après &quot;le Client&quot;) passant commande sur le site aca-wholesale.com. Toute commande implique l&apos;acceptation sans réserve des présentes CGV. ACA Wholesale se réserve le droit de les modifier à tout moment ; les CGV applicables sont celles en vigueur au moment de la passation de la commande.
          </p>
        </div>

        {/* 1 — Objet */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>1</span>
            Objet
          </h2>
          <p style={bodyStyle}>
            Les présentes CGV ont pour objet de définir les conditions dans lesquelles ACA Wholesale, grossiste basé en Moselle (France), vend des <span style={strongStyle}>lots de vêtements de seconde main</span> à des acheteurs professionnels (revendeurs, auto-entrepreneurs, commerçants).
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            Les produits proposés sont des articles d&apos;occasion sélectionnés, conditionnés en lots, destinés à la revente. Chaque lot est décrit avec soin sur la fiche produit correspondante (composition, poids approximatif, catégorie, état général).
          </p>
        </div>

        {/* 2 — Prix */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>2</span>
            Prix
          </h2>
          <p style={bodyStyle}>
            Les prix sont indiqués en <span style={strongStyle}>euros TTC</span> (toutes taxes comprises). ACA Wholesale se réserve le droit de modifier ses prix à tout moment et sans préavis. Les prix affichés au moment de la validation de la commande sont ceux applicables à ladite commande.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            Les frais de livraison, s&apos;ils sont applicables, sont indiqués séparément lors du récapitulatif de commande avant tout paiement.
          </p>
        </div>

        {/* 3 — Commandes */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>3</span>
            Commandes
          </h2>
          <p style={bodyStyle}>
            Toute commande est réputée ferme et définitive après <span style={strongStyle}>validation du paiement par Stripe</span>. Un email de confirmation récapitulant le détail de la commande est envoyé au Client dans les meilleurs délais suivant la validation.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            En cas de rupture de stock ou d&apos;indisponibilité d&apos;un lot commandé, ACA Wholesale s&apos;engage à en informer le Client par email dans les 48 heures et à proposer soit un remboursement intégral, soit un lot de substitution équivalent.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            ACA Wholesale se réserve le droit de refuser toute commande qui paraîtrait anormale ou émanerait d&apos;un Client avec lequel un litige antérieur serait en cours.
          </p>
        </div>

        {/* 4 — Paiement */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>4</span>
            Paiement
          </h2>
          <p style={bodyStyle}>
            Le paiement est exigible <span style={strongStyle}>intégralement au moment de la commande</span>. Aucune commande ne sera traitée ni expédiée sans confirmation de paiement.
          </p>

          <p style={subHeadingStyle}>Moyens de paiement acceptés</p>
          <p style={bodyStyle}>
            Les paiements sont traités de manière sécurisée via <span style={strongStyle}>Stripe</span> (carte bancaire Visa, Mastercard, etc.). ACA Wholesale ne stocke aucune donnée bancaire ; la sécurité des transactions est assurée par Stripe conformément aux normes PCI DSS.
          </p>

          <p style={subHeadingStyle}>Sécurité</p>
          <p style={bodyStyle}>
            En cas d&apos;utilisation frauduleuse d&apos;un moyen de paiement, ACA Wholesale ne saurait en être tenu responsable. Le Client est seul responsable de l&apos;utilisation de ses identifiants de paiement.
          </p>
        </div>

        {/* 5 — Livraison */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>5</span>
            Livraison
          </h2>
          <p style={bodyStyle}>
            Les commandes sont expédiées depuis la <span style={strongStyle}>Moselle, France</span>, via le transporteur <span style={strongStyle}>GLS</span> ou tout autre transporteur équivalent choisi par ACA Wholesale.
          </p>

          <p style={subHeadingStyle}>Délais</p>
          <p style={bodyStyle}>
            Le délai d&apos;expédition est généralement de 1 à 2 jours ouvrés après confirmation du paiement. La livraison en France métropolitaine s&apos;effectue sous <span style={strongStyle}>2 à 5 jours ouvrés</span> après expédition. Ces délais sont donnés à titre indicatif et peuvent varier selon les périodes de forte activité ou les contraintes du transporteur.
          </p>

          <p style={subHeadingStyle}>Suivi</p>
          <p style={bodyStyle}>
            Un email contenant le numéro de suivi est transmis au Client dès l&apos;expédition du colis. ACA Wholesale ne saurait être tenu responsable des retards imputables au transporteur.
          </p>

          <p style={subHeadingStyle}>Livraison internationale</p>
          <p style={bodyStyle}>
            ACA Wholesale livre également dans les pays de l&apos;Union Européenne et en Suisse. Les délais et frais applicables sont indiqués lors du passage de commande. Des formalités douanières peuvent s&apos;appliquer en dehors de l&apos;UE.
          </p>
        </div>

        {/* 6 — Droit de rétractation */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>6</span>
            Droit de rétractation et politique de retour
          </h2>
          <p style={bodyStyle}>
            Conformément à l&apos;article L.221-3 du Code de la consommation, <span style={strongStyle}>le droit légal de rétractation de 14 jours ne s&apos;applique pas aux contrats conclus entre professionnels</span> dans le cadre de leur activité commerciale principale. L&apos;achat de lots sur ACA Wholesale étant réservé aux revendeurs professionnels, aucun droit de rétractation légal n&apos;est applicable.
          </p>

          <p style={subHeadingStyle}>Politique de retour volontaire</p>
          <p style={bodyStyle}>
            Toutefois, ACA Wholesale s&apos;engage à traiter toute réclamation sérieuse avec bienveillance. Si un lot reçu s&apos;avère <span style={strongStyle}>manifestement non conforme</span> à la description publiée (catégorie incorrecte, état significativement différent, erreur de livraison), le Client dispose de <span style={strongStyle}>14 jours calendaires</span> à compter de la réception pour nous contacter à{' '}
            <a href="mailto:contact@aca-wholesale.com" style={{ color: '#C4962A', textDecoration: 'none' }}>contact@aca-wholesale.com</a>.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            En cas de non-conformité avérée, ACA Wholesale proposera au choix du Client : un avoir, un échange ou un remboursement partiel selon l&apos;étendue du préjudice. Les frais de retour éventuels sont à la charge du Client sauf si ACA Wholesale reconnaît expressément l&apos;erreur.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            Aucun retour ne sera accepté sans accord préalable d&apos;ACA Wholesale.
          </p>
        </div>

        {/* 7 — Réclamations */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>7</span>
            Réclamations
          </h2>
          <p style={bodyStyle}>
            Pour toute réclamation, le Client doit contacter ACA Wholesale à l&apos;adresse{' '}
            <a href="mailto:contact@aca-wholesale.com" style={{ color: '#C4962A', textDecoration: 'none' }}>contact@aca-wholesale.com</a>{' '}
            en indiquant son numéro de commande, la nature du problème et, si possible, des photos à l&apos;appui.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            ACA Wholesale s&apos;engage à accuser réception de la réclamation et à y apporter une réponse dans un délai de <span style={strongStyle}>48 heures ouvrées</span> (hors week-ends et jours fériés).
          </p>
        </div>

        {/* 8 — Responsabilité */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>8</span>
            Responsabilité
          </h2>
          <p style={bodyStyle}>
            ACA Wholesale est responsable des lots vendus dans les conditions décrites sur les fiches produits. La responsabilité d&apos;ACA Wholesale ne saurait être engagée en cas de mauvaise utilisation des produits par le Client, de dommages indirects ou de manque à gagner lié à la revente.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            Les photographies et descriptions des lots sont données à titre indicatif. La composition exacte des lots peut légèrement varier dans la limite de ce qui est raisonnablement acceptable pour un commerce de seconde main.
          </p>
        </div>

        {/* 9 — Données personnelles */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>9</span>
            Données personnelles
          </h2>
          <p style={bodyStyle}>
            Le traitement des données personnelles collectées dans le cadre d&apos;une commande est décrit dans nos{' '}
            <Link href="/mentions-legales" style={{ color: '#C4962A', textDecoration: 'none' }}>
              Mentions Légales
            </Link>
            , conformément au RGPD et à la loi Informatique et Libertés.
          </p>
        </div>

        {/* 10 — Droit applicable */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>10</span>
            Droit applicable et juridiction compétente
          </h2>
          <p style={bodyStyle}>
            Les présentes CGV sont soumises au <span style={strongStyle}>droit français</span>. En cas de litige et à défaut de résolution amiable, les tribunaux français compétents seront seuls habilités à trancher le différend.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            <span style={strongStyle}>Dernière mise à jour :</span> Avril 2026
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: 'rgba(196,150,42,0.06)', border: '1px solid rgba(196,150,42,0.2)', borderRadius: '16px', padding: '32px', textAlign: 'center', marginTop: '8px' }}>
          <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '18px', margin: '0 0 8px 0' }}>Des questions sur nos CGV ?</h3>
          <p style={{ color: '#555', fontSize: '13px', margin: '0 0 20px 0' }}>Notre équipe est disponible pour clarifier tout point de nos conditions.</p>
          <Link href="/contact" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '8px', textDecoration: 'none' }}>
            Nous contacter
          </Link>
        </div>

      </section>

      <Footer />
    </div>
  )
}
