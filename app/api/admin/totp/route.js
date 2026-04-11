export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { verifyAdmin } from '../../../../lib/adminAuth'
import * as OTPAuth from 'otpauth'
import QRCode from 'qrcode'

// GET /api/admin/totp — generate a new TOTP secret + QR code for setup
// Only works if TOTP is NOT yet configured (ADMIN_TOTP_SECRET is empty)
// Admin must be authenticated to access this
export async function GET(request) {
  const auth = verifyAdmin(request)
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const existing = process.env.ADMIN_TOTP_SECRET
  if (existing) {
    return NextResponse.json({
      enabled: true,
      message: '2FA est déjà activé. Pour le réinitialiser, supprimez ADMIN_TOTP_SECRET dans les variables d\'environnement Vercel.',
    })
  }

  // Generate a new secret
  const secret = new OTPAuth.Secret({ size: 20 })
  const totp = new OTPAuth.TOTP({
    issuer: 'ACA Wholesale',
    label: 'Admin',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret,
  })

  const uri = totp.toString()
  const qrDataUrl = await QRCode.toDataURL(uri, { width: 256, margin: 2 })

  return NextResponse.json({
    enabled: false,
    secret: secret.base32,
    qr: qrDataUrl,
    uri,
    instructions: 'Scannez le QR code avec Google Authenticator, Authy, ou 1Password. Puis ajoutez ADMIN_TOTP_SECRET=' + secret.base32 + ' dans vos variables d\'environnement Vercel et redéployez.',
  })
}
