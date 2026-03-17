import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email, items, total } = await request.json()
    if (!email || !items?.length) return Response.json({ error: 'Données manquantes' }, { status: 400 })

    const articlesHTML = items.map(item =>
      `<tr>
        <td style="padding:10px 8px;border-bottom:1px solid #eee">${item.name}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center">×${item.qty}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right;font-weight:bold">${item.price * item.qty}€</td>
      </tr>`
    ).join('')

    await resend.emails.send({
      from: 'ACA Wholesale <onboarding@resend.dev>',
      to: email,
      subject: '🛒 Vous avez oublié quelque chose...',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#fff">
          <div style="background:#0a0500;padding:28px 30px;text-align:center">
            <h1 style="color:#C4962A;margin:0;font-size:22px;letter-spacing:3px">ACA WHOLESALE</h1>
            <p style="color:#888;margin:4px 0 0;font-size:12px;letter-spacing:2px;text-transform:uppercase">Grossiste vêtements seconde main</p>
          </div>
          <div style="padding:32px 30px">
            <h2 style="color:#111;margin:0 0 10px;font-size:20px">Votre panier vous attend 👀</h2>
            <p style="color:#666;margin:0 0 24px;line-height:1.6">Vous avez laissé des articles dans votre panier. Nos lots sont en stock limité — ne les laissez pas partir !</p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
              <thead>
                <tr style="background:#f9f9f9">
                  <th style="padding:8px;text-align:left;font-size:11px;color:#999;text-transform:uppercase">Article</th>
                  <th style="padding:8px;text-align:center;font-size:11px;color:#999;text-transform:uppercase">Qté</th>
                  <th style="padding:8px;text-align:right;font-size:11px;color:#999;text-transform:uppercase">Prix</th>
                </tr>
              </thead>
              <tbody>${articlesHTML}</tbody>
            </table>
            <div style="background:#fafafa;padding:14px 16px;border-radius:4px;text-align:right;margin-bottom:24px">
              <span style="font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px">Total estimé</span>
              <span style="font-size:22px;font-weight:900;color:#C4962A;margin-left:12px">${total}€</span>
            </div>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://aca-wholesale.vercel.app'}/panier" style="display:block;background:linear-gradient(135deg,#C4962A,#E8B84B);color:#000;text-align:center;padding:16px;text-decoration:none;font-weight:900;font-size:13px;letter-spacing:2px;text-transform:uppercase;border-radius:4px">
              Finaliser ma commande →
            </a>
          </div>
          <div style="padding:16px 30px;text-align:center;border-top:1px solid #eee">
            <p style="margin:0;color:#bbb;font-size:11px">ACA Wholesale • Moselle, France • Lots sélectionnés pour les revendeurs Vinted</p>
          </div>
        </div>
      `
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Erreur envoi' }, { status: 500 })
  }
}
