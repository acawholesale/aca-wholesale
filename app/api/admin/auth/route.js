import { NextResponse } from 'next/server'

export async function POST(request) {
  const { password } = await request.json()

  const adminPassword = (process.env.ADMIN_PASSWORD || '').trim()
  const inputPassword = (password || '').trim()

  if (inputPassword === adminPassword) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', process.env.ADMIN_SECRET || 'secret', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    })
    return response
  }

  return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin_session')
  return response
}
