import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  const { destinataires, sujet, contenu, expediteur } = await request.json()

  if (!destinataires || destinataires.length === 0) {
    return NextResponse.json({ error: 'Aucun destinataire' }, { status: 400 })
  }

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background:#0a0500;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#0a0500;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#C4962A,#E8B84B);padding:24px 32px;text-align:center;">
          <h1 style="margin:0;color:#000;font-size:28px;font-weight:900;letter-spacing:-1px;">ACA WHOLESALE</h1>
          <p style="margin:4px 0 0;color:rgba(0,0,0,0.6);font-size:11px;text-transform:uppercase;letter-spacing:2px;">Moselle, France</p>
        </div>
        <!-- Content -->
        <div style="padding:40px 32px;background:#111;border-left:1px solid rgba(196,150,42,0.2);border-right:1px solid rgba(196,150,42,0.2);">
          <div style="color:#e5e7eb;font-size:15px;line-height:1.8;white-space:pre-wrap;">${contenu}</div>
        </div>
        <!-- CTA -->
        <div style="padding:24px 32px;background:#111;text-align:center;border-left:1px solid rgba(196,150,42,0.2);border-right:1px solid rgba(196,150,42,0.2);">
          <a href="https://aca-wholesale.vercel.app/produits" style="display:inline-block;background:linear-gradient(135deg,#C4962A,#E8B84B);color:#000;padding:14px 32px;font-weight:900;font-size:13px;text-decoration:none;border-radius:6px;text-transform:uppercase;letter-spacing:2px;">VOIR NOS LOTS →</a>
        </div>
        <!-- Footer -->
        <div style="padding:20px 32px;background:#0a0500;border:1px solid rgba(196,150,42,0.15);border-top:none;text-align:center;">
          <p style="margin:0;color:#6b7280;font-size:11px;">ACA Wholesale • Moselle, France • contact@aca-wholesale.com</p>
          <p style="margin:6px 0 0;color:#4b5563;font-size:10px;">Vous recevez cet email car vous êtes client ACA Wholesale.</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const results = await Promise.allSettled(
      destinataires.map(dest =>
        resend.emails.send({
          from: `ACA Wholesale <onboarding@resend.dev>`,
          to: dest.email,
          subject: sujet,
          html: htmlTemplate,
        })
      )
    )

    const succes = results.filter(r => r.status === 'fulfilled').length
    const echecs = results.filter(r => r.status === 'rejected').length

    return NextResponse.json({ success: true, succes, echecs, total: destinataires.length })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
