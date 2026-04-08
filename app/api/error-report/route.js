export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@aca-wholesale.com'
const FROM = process.env.RESEND_FROM || 'ACA Wholesale <noreply@aca-wholesale.com>'

export async function POST(req) {
  try {
    const { message, stack, url, userAgent, timestamp } = await req.json()

    if (!message) {
      return NextResponse.json({ error: 'message required' }, { status: 400 })
    }

    // Rate limit: max 10 error reports per minute (simple in-memory)
    if (!global._errorReportCount) global._errorReportCount = { count: 0, reset: Date.now() }
    if (Date.now() - global._errorReportCount.reset > 60000) {
      global._errorReportCount = { count: 0, reset: Date.now() }
    }
    global._errorReportCount.count++
    if (global._errorReportCount.count > 10) {
      return NextResponse.json({ ok: true, throttled: true })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[ERROR REPORT]', message, url)
      return NextResponse.json({ ok: true, logged: true })
    }

    const html = `
      <div style="font-family:monospace;background:#111;color:#fff;padding:24px;border-radius:8px;">
        <h2 style="color:#ef4444;margin:0 0 16px;">Erreur sur ACA Wholesale</h2>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>URL:</strong> ${url || 'N/A'}</p>
        <p><strong>Date:</strong> ${timestamp || new Date().toISOString()}</p>
        <p><strong>User-Agent:</strong> ${userAgent || 'N/A'}</p>
        ${stack ? `<pre style="background:#000;padding:12px;border-radius:4px;overflow-x:auto;font-size:11px;color:#f87171;margin-top:12px;">${stack}</pre>` : ''}
      </div>
    `

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [ADMIN_EMAIL],
        subject: `[ERREUR] ${message.slice(0, 80)}`,
        html,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error report handler failed:', err)
    return NextResponse.json({ ok: true })
  }
}
