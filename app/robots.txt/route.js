export const runtime = 'edge'

export async function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api',
    '',
    'Sitemap: https://aca-wholesale.vercel.app/sitemap.xml',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
