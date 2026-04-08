export const runtime = 'edge'

const BASE_URL = 'https://aca-wholesale.vercel.app'

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/produits', priority: '0.9', changefreq: 'weekly' },
  { path: '/a-propos', priority: '0.7', changefreq: 'monthly' },
  { path: '/avis', priority: '0.7', changefreq: 'weekly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/cgv', priority: '0.4', changefreq: 'yearly' },
  { path: '/mentions-legales', priority: '0.4', changefreq: 'yearly' },
  { path: '/comment-revendre', priority: '0.7', changefreq: 'monthly' },
  { path: '/calculateur', priority: '0.6', changefreq: 'monthly' },
  { path: '/login', priority: '0.3', changefreq: 'yearly' },
  { path: '/register', priority: '0.3', changefreq: 'yearly' },
]

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0]

  const urls = pages
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
