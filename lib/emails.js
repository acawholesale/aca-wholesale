// Envoi d'emails via l'API HTTP Resend — aucune dépendance npm
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aca-wholesale.vercel.app'
const FROM = process.env.RESEND_FROM || 'ACA Wholesale <noreply@aca-wholesale.com>'

async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Resend error: ${JSON.stringify(err)}`)
  }
  return res.json()
}

// ─── Rows HTML des articles ────────────────────────────────────────────────
function itemsRows(items) {
  return items.map(item => `
    <tr>
      <td style="padding:14px 16px;border-bottom:1px solid #1a1a1a;font-size:22px;width:44px;">${item.emoji || '📦'}</td>
      <td style="padding:14px 16px;border-bottom:1px solid #1a1a1a;color:#e5e7eb;font-weight:700;font-size:13px;">${item.name}</td>
      <td style="padding:14px 16px;border-bottom:1px solid #1a1a1a;color:#6b7280;font-size:12px;text-align:center;">×${item.qty}</td>
      <td style="padding:14px 16px;border-bottom:1px solid #1a1a1a;color:#C4962A;font-weight:900;font-size:14px;text-align:right;white-space:nowrap;">${item.price * item.qty}€</td>
    </tr>`).join('')
}

// ─── Wrapper commun ────────────────────────────────────────────────────────
function wrap(body) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>ACA Wholesale</title></head>
<body style="margin:0;padding:0;background:#080808;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<div style="max-width:620px;margin:0 auto;padding:40px 20px 60px;">

  <!-- Header -->
  <div style="text-align:center;margin-bottom:36px;">
    <a href="${SITE_URL}" style="display:inline-block;background:linear-gradient(135deg,#C4962A,#E8B84B);padding:10px 28px;border-radius:4px;text-decoration:none;">
      <span style="color:#000;font-weight:900;font-size:16px;letter-spacing:0.12em;text-transform:uppercase;">ACA WHOLESALE</span>
    </a>
  </div>

  ${body}

  <!-- Footer -->
  <div style="margin-top:40px;padding-top:24px;border-top:1px solid #1a1a1a;text-align:center;">
    <p style="color:#4b5563;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px;">ACA Wholesale — Moselle, France</p>
    <p style="color:#374151;font-size:11px;margin:0 0 4px;">Lun–Ven 9h–18h &nbsp;|&nbsp; <a href="mailto:contact@aca-wholesale.com" style="color:#C4962A;text-decoration:none;">contact@aca-wholesale.com</a></p>
    <p style="color:#2d3748;font-size:10px;margin:12px 0 0;">Vous recevez cet email car vous avez un panier en attente sur <a href="${SITE_URL}" style="color:#C4962A;text-decoration:none;">aca-wholesale.vercel.app</a></p>
  </div>

</div>
</body></html>`
}

// ─── Email 1h : premier rappel doux ───────────────────────────────────────
export async function send1hReminder({ email, prenom, items, total }) {
  const html = wrap(`
    <div style="background:#111;border:1px solid #1f1f1f;border-radius:12px;padding:36px;margin-bottom:20px;">
      <p style="color:#C4962A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;">🛒 Panier en attente</p>
      <h1 style="color:#fff;font-size:24px;font-weight:900;text-transform:uppercase;letter-spacing:0.04em;margin:0 0 10px;line-height:1.2;">
        Vous avez oublié<br>quelque chose !
      </h1>
      <p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0 0 28px;">
        Bonjour <strong style="color:#fff;">${prenom || 'Revendeur'}</strong>, votre sélection de lots ACA Wholesale est toujours disponible. Il vous suffit d'un clic pour finaliser votre commande.
      </p>

      <table style="width:100%;border-collapse:collapse;background:#0d0d0d;border-radius:8px;overflow:hidden;margin-bottom:24px;">
        ${itemsRows(items)}
        <tr>
          <td colspan="3" style="padding:14px 16px;text-align:right;font-size:11px;color:#6b7280;text-transform:uppercase;font-weight:700;letter-spacing:0.06em;">Total estimé</td>
          <td style="padding:14px 16px;text-align:right;font-weight:900;font-size:22px;color:#fff;white-space:nowrap;">${total}€</td>
        </tr>
      </table>

      <div style="text-align:center;margin-bottom:16px;">
        <a href="${SITE_URL}/panier" style="display:inline-block;background:linear-gradient(135deg,#C4962A,#E8B84B);color:#000;padding:16px 44px;font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;border-radius:4px;text-decoration:none;">
          FINALISER MA COMMANDE →
        </a>
      </div>
      <p style="color:#6b7280;font-size:12px;text-align:center;margin:0;">⏰ Votre panier est réservé encore <strong style="color:#e5e7eb;">23 heures</strong></p>
    </div>

    <div style="background:rgba(196,150,42,0.07);border:1px solid rgba(196,150,42,0.18);border-radius:8px;padding:16px;">
      <p style="color:#C4962A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px;">💡 Pourquoi ACA Wholesale ?</p>
      <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin:0;">Lots sélectionnés à la main · Expédition depuis la Moselle · Réponse de notre équipe sous 24h</p>
    </div>`)

  return sendEmail(email, `🛒 Vous avez oublié quelque chose dans votre panier ACA !`, html)
}

// ─── Email 8h : rappel intermédiaire ──────────────────────────────────────
export async function send8hReminder({ email, prenom, items, total }) {
  const html = wrap(`
    <div style="background:#111;border:1px solid #1f1f1f;border-radius:12px;padding:36px;margin-bottom:20px;">
      <p style="color:#C4962A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;">📦 Votre sélection vous attend</p>
      <h1 style="color:#fff;font-size:24px;font-weight:900;text-transform:uppercase;letter-spacing:0.04em;margin:0 0 10px;line-height:1.2;">
        Vos lots sont<br>toujours disponibles
      </h1>
      <p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0 0 28px;">
        Bonjour <strong style="color:#fff;">${prenom || 'Revendeur'}</strong>, vos lots sélectionnés vous attendent. Ne laissez pas passer cette opportunité de revente !
      </p>

      <table style="width:100%;border-collapse:collapse;background:#0d0d0d;border-radius:8px;overflow:hidden;margin-bottom:24px;">
        ${itemsRows(items)}
        <tr>
          <td colspan="3" style="padding:14px 16px;text-align:right;font-size:11px;color:#6b7280;text-transform:uppercase;font-weight:700;letter-spacing:0.06em;">Total estimé</td>
          <td style="padding:14px 16px;text-align:right;font-weight:900;font-size:22px;color:#fff;white-space:nowrap;">${total}€</td>
        </tr>
      </table>

      <div style="text-align:center;margin-bottom:16px;">
        <a href="${SITE_URL}/panier" style="display:inline-block;background:linear-gradient(135deg,#C4962A,#E8B84B);color:#000;padding:16px 44px;font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;border-radius:4px;text-decoration:none;">
          REPRENDRE MON PANIER →
        </a>
      </div>
      <p style="color:#6b7280;font-size:12px;text-align:center;margin:0;">⏰ Votre panier expire dans <strong style="color:#E8B84B;">16 heures</strong></p>
    </div>

    <div style="background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.15);border-radius:8px;padding:16px;">
      <p style="color:#22c55e;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px;">💰 Potentiel de revente estimé</p>
      <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin:0;">Revendez vos lots sur Vinted, Leboncoin ou en boutique et multipliez votre investissement initial. Notre équipe vous accompagne.</p>
    </div>`)

  return sendEmail(email, `📦 Votre panier ACA Wholesale vous attend toujours`, html)
}

// ─── Email 16h : urgence ──────────────────────────────────────────────────
export async function send16hReminder({ email, prenom, items, total }) {
  const html = wrap(`
    <div style="background:#111;border:1px solid rgba(239,68,68,0.25);border-radius:12px;padding:36px;margin-bottom:20px;">
      <div style="background:rgba(239,68,68,0.09);border:1px solid rgba(239,68,68,0.2);border-radius:6px;padding:11px 16px;margin-bottom:20px;">
        <p style="color:#ef4444;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;margin:0;">⚠️ Votre panier expire dans moins de 8 heures</p>
      </div>

      <h1 style="color:#fff;font-size:24px;font-weight:900;text-transform:uppercase;letter-spacing:0.04em;margin:0 0 10px;line-height:1.2;">
        Dernière chance !
      </h1>
      <p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0 0 28px;">
        Bonjour <strong style="color:#fff;">${prenom || 'Revendeur'}</strong>, votre panier va expirer très bientôt. Finalisez votre commande maintenant avant de perdre votre sélection.
      </p>

      <table style="width:100%;border-collapse:collapse;background:#0d0d0d;border-radius:8px;overflow:hidden;margin-bottom:24px;">
        ${itemsRows(items)}
        <tr>
          <td colspan="3" style="padding:14px 16px;text-align:right;font-size:11px;color:#6b7280;text-transform:uppercase;font-weight:700;letter-spacing:0.06em;">Total estimé</td>
          <td style="padding:14px 16px;text-align:right;font-weight:900;font-size:22px;color:#fff;white-space:nowrap;">${total}€</td>
        </tr>
      </table>

      <div style="text-align:center;margin-bottom:16px;">
        <a href="${SITE_URL}/panier" style="display:inline-block;background:linear-gradient(135deg,#C4962A,#E8B84B);color:#000;padding:16px 44px;font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;border-radius:4px;text-decoration:none;">
          COMMANDER AVANT EXPIRATION →
        </a>
      </div>
      <p style="color:#6b7280;font-size:12px;text-align:center;margin:0;">🔒 Notre équipe vous répond sous 24h après votre commande</p>
    </div>`)

  return sendEmail(email, `⚠️ Plus que 8h — Votre panier ACA expire bientôt`, html)
}

// ─── Email 24h : panier clôturé ───────────────────────────────────────────
export async function send24hExpired({ email, prenom, items, total }) {
  const html = wrap(`
    <div style="background:#111;border:1px solid #1f1f1f;border-radius:12px;padding:36px;margin-bottom:20px;">
      <h1 style="color:#6b7280;font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:0.04em;margin:0 0 10px;line-height:1.2;">
        Votre panier a expiré
      </h1>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 24px;">
        Bonjour <strong style="color:#9ca3af;">${prenom || 'Revendeur'}</strong>, votre panier de <strong style="color:#9ca3af;">${total}€</strong> a été clôturé après 24h sans validation. Voici ce qu'il contenait :
      </p>

      <div style="background:#0d0d0d;border-radius:8px;overflow:hidden;margin-bottom:24px;">
        <div style="padding:12px 16px;border-bottom:1px solid #1a1a1a;">
          <p style="color:#374151;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Contenu clôturé</p>
        </div>
        <table style="width:100%;border-collapse:collapse;opacity:0.6;">
          ${itemsRows(items)}
          <tr>
            <td colspan="3" style="padding:14px 16px;text-align:right;font-size:11px;color:#374151;text-transform:uppercase;font-weight:700;">Total</td>
            <td style="padding:14px 16px;text-align:right;font-weight:900;font-size:20px;color:#374151;white-space:nowrap;">${total}€</td>
          </tr>
        </table>
      </div>

      <div style="text-align:center;margin-bottom:12px;">
        <a href="${SITE_URL}/produits" style="display:inline-block;background:linear-gradient(135deg,#C4962A,#E8B84B);color:#000;padding:16px 44px;font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;border-radius:4px;text-decoration:none;">
          RECOMMENCER MA SÉLECTION →
        </a>
      </div>
      <p style="color:#374151;font-size:12px;text-align:center;margin:0;">Nos lots sont toujours disponibles. Revenez quand vous voulez !</p>
    </div>

    <div style="background:rgba(196,150,42,0.06);border:1px solid rgba(196,150,42,0.15);border-radius:8px;padding:16px;">
      <p style="color:#C4962A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px;">📞 Une question ?</p>
      <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin:0;">Notre équipe est disponible Lun–Ven 9h–18h. <a href="${SITE_URL}/contact" style="color:#C4962A;text-decoration:none;">Contactez-nous</a> pour toute question sur nos lots.</p>
    </div>`)

  return sendEmail(email, `❌ Votre panier ACA Wholesale a expiré`, html)
}

// ─── Email expédition : suivi GLS ────────────────────────────────────────
export async function sendShippingNotification({ email, prenom, orderId, trackID, trackingUrl }) {
  const html = wrap(`
    <div style="background:#111;border:1px solid #1f1f1f;border-radius:12px;padding:36px;margin-bottom:20px;">
      <p style="color:#22c55e;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;">🚚 Commande expédiée</p>
      <h1 style="color:#fff;font-size:24px;font-weight:900;text-transform:uppercase;letter-spacing:0.04em;margin:0 0 10px;line-height:1.2;">
        Votre colis est<br>en chemin !
      </h1>
      <p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0 0 28px;">
        Bonjour <strong style="color:#fff;">${prenom || 'Revendeur'}</strong>, votre commande <strong style="color:#C4962A;">${orderId}</strong> a été expédiée via GLS. Vous pouvez suivre votre colis en temps réel.
      </p>

      <div style="background:#0d0d0d;border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
        <p style="color:#6b7280;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Numéro de suivi GLS</p>
        <p style="color:#fff;font-size:22px;font-weight:900;letter-spacing:0.15em;margin:0;">${trackID}</p>
      </div>

      <div style="text-align:center;margin-bottom:16px;">
        <a href="${trackingUrl}" style="display:inline-block;background:linear-gradient(135deg,#C4962A,#E8B84B);color:#000;padding:16px 44px;font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;border-radius:4px;text-decoration:none;">
          SUIVRE MON COLIS →
        </a>
      </div>
      <p style="color:#6b7280;font-size:12px;text-align:center;margin:0;">
        Vous pouvez aussi suivre votre colis depuis votre <a href="${SITE_URL}/compte" style="color:#C4962A;text-decoration:none;">espace client</a>
      </p>
    </div>

    <div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.15);border-radius:8px;padding:16px;">
      <p style="color:#3b82f6;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px;">📦 Livraison estimée</p>
      <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin:0;">Délai habituel : 2 à 5 jours ouvrés en France métropolitaine. Expédié depuis la Moselle.</p>
    </div>`)

  return sendEmail(email, `🚚 Votre commande ${orderId} est en route !`, html)
}
