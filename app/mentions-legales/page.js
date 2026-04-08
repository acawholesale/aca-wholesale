'use client'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

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

export default function MentionsLegales() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />

      {/* Header */}
      <section style={{ padding: '60px 24px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
        <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>Informations légales</p>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(26px, 5vw, 48px)', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 12px 0' }}>MENTIONS LÉGALES</h1>
        <p style={{ color: '#555', fontSize: '14px', maxWidth: '480px', margin: '0 auto' }}>Conformément à l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique</p>
      </section>

      {/* Content */}
      <section id="main-content" tabIndex={-1} style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px 64px' }}>

        {/* 1 — Éditeur du site */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>1</span>
            Éditeur du site
          </h2>
          <p style={bodyStyle}>
            <span style={strongStyle}>Raison sociale :</span> ACA Wholesale<br />
            <span style={strongStyle}>Responsable de publication :</span> Yoan Staub<br />
            <span style={strongStyle}>Adresse :</span> Moselle, France<br />
            <span style={strongStyle}>Email :</span>{' '}
            <a href="mailto:contact@aca-wholesale.com" style={{ color: '#C4962A', textDecoration: 'none' }}>contact@aca-wholesale.com</a><br />
            <span style={strongStyle}>Activité :</span> Vente en gros (wholesale) de lots de vêtements de seconde main à destination des revendeurs professionnels
          </p>
        </div>

        {/* 2 — Hébergeur */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>2</span>
            Hébergeur
          </h2>
          <p style={bodyStyle}>
            <span style={strongStyle}>Société :</span> Vercel Inc.<br />
            <span style={strongStyle}>Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis<br />
            <span style={strongStyle}>Site web :</span>{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#C4962A', textDecoration: 'none' }}>vercel.com</a>
          </p>
        </div>

        {/* 3 — Propriété intellectuelle */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>3</span>
            Propriété intellectuelle
          </h2>
          <p style={bodyStyle}>
            L&apos;ensemble des éléments constituant le site aca-wholesale.com (textes, images, logos, graphismes, structure) est la propriété exclusive d&apos;ACA Wholesale, sauf mention contraire explicite.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation écrite préalable d&apos;ACA Wholesale. Toute exploitation non autorisée du site ou de son contenu constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>
        </div>

        {/* 4 — Protection des données personnelles (RGPD) */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>4</span>
            Protection des données personnelles (RGPD)
          </h2>
          <p style={bodyStyle}>
            Conformément au Règlement Général sur la Protection des Données (RGPD) — Règlement (UE) 2016/679 — et à la loi Informatique et Libertés, ACA Wholesale traite vos données personnelles dans le cadre strict de son activité commerciale.
          </p>

          <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', margin: '20px 0 8px 0' }}>Données collectées</p>
          <p style={bodyStyle}>
            Lors de la création d&apos;un compte ou d&apos;une commande, nous collectons : nom, prénom, adresse email, adresse de livraison et informations de paiement (traitées exclusivement par Stripe, sans stockage de votre côté). Dans le cadre de l&apos;inscription à la newsletter, nous collectons uniquement votre adresse email.
          </p>

          <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', margin: '20px 0 8px 0' }}>Finalité du traitement</p>
          <p style={bodyStyle}>
            Les données collectées sont utilisées exclusivement pour : le traitement et le suivi de vos commandes, la gestion de votre compte client, la communication relative à vos achats, l&apos;envoi d&apos;offres commerciales si vous y avez consenti, et le respect de nos obligations légales et comptables.
          </p>

          <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', margin: '20px 0 8px 0' }}>Durée de conservation</p>
          <p style={bodyStyle}>
            Vos données sont conservées pendant la durée nécessaire à la finalité pour laquelle elles ont été collectées, et au maximum 3 ans à compter de votre dernière interaction avec ACA Wholesale, sauf obligation légale de conservation plus longue (données comptables : 10 ans).
          </p>

          <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', margin: '20px 0 8px 0' }}>Vos droits</p>
          <p style={bodyStyle}>
            Conformément au RGPD, vous disposez des droits suivants : droit d&apos;accès, de rectification, d&apos;effacement, de limitation, de portabilité et d&apos;opposition. Pour exercer ces droits, contactez-nous à{' '}
            <a href="mailto:contact@aca-wholesale.com" style={{ color: '#C4962A', textDecoration: 'none' }}>contact@aca-wholesale.com</a>.
            Vous avez également le droit d&apos;introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#C4962A', textDecoration: 'none' }}>cnil.fr</a>).
          </p>
        </div>

        {/* 5 — Cookies */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>5</span>
            Cookies
          </h2>
          <p style={bodyStyle}>
            Le site aca-wholesale.com utilise des cookies techniques strictement nécessaires au bon fonctionnement du service (gestion de session, panier, authentification).
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            <span style={strongStyle}>Stripe :</span> Lors du paiement en ligne, Stripe peut déposer des cookies techniques indispensables à la sécurisation et au traitement des transactions. Ces cookies sont soumis à la politique de confidentialité de Stripe (<a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#C4962A', textDecoration: 'none' }}>stripe.com/fr/privacy</a>).
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            Aucun cookie publicitaire ou de suivi comportemental tiers n&apos;est déposé sans votre consentement préalable.
          </p>
        </div>

        {/* 6 — Limitation de responsabilité */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>6</span>
            Limitation de responsabilité
          </h2>
          <p style={bodyStyle}>
            ACA Wholesale s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations publiées sur ce site. Toutefois, ACA Wholesale ne peut garantir l&apos;exactitude, la complétude ou l&apos;actualité des informations diffusées. En conséquence, l&apos;utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            ACA Wholesale se réserve le droit de modifier, sans préavis, les contenus du site ainsi que les présentes mentions légales.
          </p>
        </div>

        {/* 7 — Droit applicable */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <span style={numberBadgeStyle}>7</span>
            Droit applicable et juridiction compétente
          </h2>
          <p style={bodyStyle}>
            Les présentes mentions légales sont régies par le droit français. En cas de litige relatif à l&apos;interprétation ou à l&apos;exécution des présentes, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            <span style={strongStyle}>Dernière mise à jour :</span> Avril 2026
          </p>
        </div>

      </section>

      <Footer />
    </div>
  )
}
