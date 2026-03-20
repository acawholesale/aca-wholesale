const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aca-wholesale.vercel.app'
const BRAND_COLOR = '#ffffff'
const BG_COLOR = '#0a0a0a'
const CARD_BG = '#141414'
const BORDER_COLOR = '#2a2a2a'
const MUTED_COLOR = '#888888'

const baseStyles = `
  body { margin:0; padding:0; background:${BG_COLOR}; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:${BRAND_COLOR}; }
  * { box-sizing:border-box; }
`

function productRow(p) {
  const subtotal = ((p.price || 0) * (p.quantity || 1)).toFixed(0)
  return `
    <tr>
      <td style="padding:12px 0; border-bottom:1px solid ${BORDER_COLOR}; font-size:14px;">
        <strong>${p.name || 'Lot'}</strong>
        ${p.description ? `<br><span style="color:${MUTED_COLOR};font-size:12px;">${p.description}</span>` : ''}
      </td>
      <td style="padding:12px 0; border-bottom:1px solid ${BORDER_COLOR}; text-align:right; white-space:nowrap; font-size:14px;">
        ${p.quantity} × ${p.price}€<br>
        <span style="color:${MUTED_COLOR};font-size:12px;">${subtotal}€</span>
      </td>
    </tr>
  `
}

function cartTotal(products) {
  return products.reduce((s, p) => s + (p.price || 0) * (p.quantity || 1), 0).toFixed(0)
}

function layout(title, body) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title}</title>
  <style>${baseStyles}</style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:${CARD_BG};border-radius:16px 16px 0 0;padding:32px;border:1px solid ${BORDER_COLOR};border-bottom:0;">
          <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:2px;">ACA WHOLESALE</p>
          <p style="margin:4px 0 0;font-size:12px;color:${MUTED_COLOR};letter-spacing:1px;">GROSSISTE · MOSELLE, FRANCE</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:${CARD_BG};padding:32px;border-left:1px solid ${BORDER_COLOR};border-right:1px solid ${BORDER_COLOR};">
          ${body}
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:${BG_COLOR};border-radius:0 0 16px 16px;padding:24px 32px;border:1px solid ${BORDER_COLOR};border-top:0;">
          <p style="margin:0;font-size:12px;color:${MUTED_COLOR};text-align:center;">
            ACA Wholesale · Moselle, France<br>
            <a href="${SITE_URL}" style="color:${MUTED_COLOR};">${SITE_URL}</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ── Rappel 1h ────────────────────────────────────────────────
export function emailReminder1h(email, products) {
  const total = cartTotal(products)
  const rows = products.map(productRow).join('')
  return {
    subject: '⏰ Votre panier vous attend — ACA Wholesale',
    html: layout('Votre panier vous attend', `
      <h2 style="margin:0 0 8px;font-size:20px;">Vous avez oublié quelque chose&nbsp;!</h2>
      <p style="margin:0 0 24px;color:${MUTED_COLOR};font-size:14px;">
        Votre sélection est toujours disponible. Les lots partent vite.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px;">
        ${rows}
        <tr>
          <td style="padding-top:16px;font-weight:700;">Total estimé</td>
          <td style="padding-top:16px;text-align:right;font-weight:700;">${total}€</td>
        </tr>
      </table>

      <a href="${SITE_URL}/panier" style="display:inline-block;background:${BRAND_COLOR};color:#000;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:15px;">
        Finaliser mon devis →
      </a>
    `),
  }
}

// ── Rappel 8h ────────────────────────────────────────────────
export function emailReminder8h(email, products) {
  const total = cartTotal(products)
  const rows = products.map(productRow).join('')
  return {
    subject: '🔥 Stock limité — Finalisez votre commande ACA Wholesale',
    html: layout('Stock limité', `
      <h2 style="margin:0 0 8px;font-size:20px;">Les stocks s&apos;épuisent&nbsp;!</h2>
      <p style="margin:0 0 24px;color:${MUTED_COLOR};font-size:14px;">
        Certains lots de votre panier sont presque épuisés. Passez votre devis maintenant pour sécuriser votre commande.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px;">
        ${rows}
        <tr>
          <td style="padding-top:16px;font-weight:700;">Total estimé</td>
          <td style="padding-top:16px;text-align:right;font-weight:700;">${total}€</td>
        </tr>
      </table>

      <a href="${SITE_URL}/panier" style="display:inline-block;background:${BRAND_COLOR};color:#000;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:15px;">
        Sécuriser mon lot →
      </a>
    `),
  }
}

// ── Rappel 16h ───────────────────────────────────────────────
export function emailReminder16h(email, products) {
  const total = cartTotal(products)
  const rows = products.map(productRow).join('')
  return {
    subject: '📦 Dernière chance — Votre panier ACA Wholesale expire bientôt',
    html: layout('Dernière chance', `
      <h2 style="margin:0 0 8px;font-size:20px;">Votre panier expire dans 8h</h2>
      <p style="margin:0 0 24px;color:${MUTED_COLOR};font-size:14px;">
        Ne laissez pas filer ces lots. Votre sélection sera libérée dans 8 heures.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px;">
        ${rows}
        <tr>
          <td style="padding-top:16px;font-weight:700;">Total estimé</td>
          <td style="padding-top:16px;text-align:right;font-weight:700;">${total}€</td>
        </tr>
      </table>

      <a href="${SITE_URL}/panier" style="display:inline-block;background:${BRAND_COLOR};color:#000;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:15px;">
        Finaliser maintenant →
      </a>
    `),
  }
}

// ── Rappel 24h ───────────────────────────────────────────────
export function emailReminder24h(email, products) {
  const total = cartTotal(products)
  return {
    subject: '👋 Votre panier a expiré — Revenez quand vous voulez',
    html: layout('À bientôt', `
      <h2 style="margin:0 0 8px;font-size:20px;">Votre panier a été libéré</h2>
      <p style="margin:0 0 24px;color:${MUTED_COLOR};font-size:14px;">
        Votre sélection de <strong>${total}€</strong> n&apos;est plus réservée.
        Mais nos lots sont toujours disponibles — revenez quand vous voulez&nbsp;!
      </p>

      <a href="${SITE_URL}/produits" style="display:inline-block;background:${BRAND_COLOR};color:#000;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:15px;margin-bottom:24px;">
        Voir les lots disponibles →
      </a>

      <p style="font-size:13px;color:${MUTED_COLOR};margin-top:24px;">
        Une question ? Contactez-nous via <a href="${SITE_URL}/contact" style="color:${BRAND_COLOR};">notre page contact</a>.
      </p>
    `),
  }
}
