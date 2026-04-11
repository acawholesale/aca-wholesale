export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { rateLimit } from '../../../lib/ratelimit'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@aca-wholesale.com'
const FROM = process.env.RESEND_FROM || 'ACA Wholesale <noreply@aca-wholesale.com>'

function escapeHtml(str) {
  if (!str) return ''
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = await rateLimit(ip, 'contact', { limit: 3, window: 300 })
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Trop de messages envoyés. Réessayez dans quelques minutes.' },
        { status: 429, headers: { 'Retry-After': '300' } }
      )
    }

    const body = await req.json()
    const { prenom, nom, email, sujet, message } = body

    if (!prenom || !nom || !email || !message) {
      return NextResponse.json({ error: 'Tous les champs obligatoires doivent être remplis.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message trop long (5000 caractères max).' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[CONTACT] No RESEND_API_KEY — message from:', email, sujet)
      return NextResponse.json({ success: true })
    }

    const html = `
      <div style="font-family:Arial,sans-serif;background:#111;color:#fff;padding:32px;border-radius:12px;max-width:600px;">
        <h2 style="color:#C4962A;margin:0 0 24px;font-size:18px;">Nouveau message — Contact</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;width:100px;">Nom</td><td style="padding:8px 0;color:#fff;font-size:14px;">${escapeHtml(prenom)} ${escapeHtml(nom)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#C4962A;text-decoration:none;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;">Sujet</td><td style="padding:8px 0;color:#fff;font-size:14px;">${escapeHtml(sujet || 'Non précisé')}</td></tr>
        </table>
        <div style="margin-top:20px;padding:20px;background:rgba(255,255,255,0.05);border-radius:8px;">
          <p style="color:#6b7280;font-size:11px;font-weight:700;text-transform:uppercase;margin:0 0 8px;">Message</p>
          <p style="color:#e5e7eb;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
        <p style="margin-top:20px;color:#4b5563;font-size:11px;">Envoyé depuis le formulaire de contact ACA Wholesale</p>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [ADMIN_EMAIL],
        reply_to: email,
        subject: `[Contact] ${sujet || 'Message'} — ${prenom} ${nom}`,
        html,
      }),
    })

    if (!res.ok) {
      console.error('Contact email failed:', await res.text())
      return NextResponse.json({ error: 'Erreur lors de l\'envoi du message.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
