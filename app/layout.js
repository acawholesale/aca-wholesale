import './globals.css'
import { CartProvider } from '../context/CartContext'
import { AuthProvider } from '../context/AuthContext'
import { I18nProvider } from '../lib/i18n/context'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const playfair = Playfair_Display({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://aca-wholesale.vercel.app'),
  title: 'ACA Wholesale - Lots de Vêtements de Seconde Main | Moselle, France',
  description:
    'Grossiste en lots de vêtements de seconde main basé en Moselle. Lots sélectionnés avec soin pour les revendeurs Vinted. Expédition rapide depuis la France. Nike, Adidas, Ralph Lauren et plus.',
  keywords:
    'vêtements seconde main, lots vêtements, grossiste vinted, wholesale vêtements, revendeur vinted, ballots vêtements marque, moselle',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aca-wholesale.vercel.app',
    siteName: 'ACA Wholesale',
    title: 'ACA Wholesale - Lots de Vêtements de Seconde Main | Moselle, France',
    description:
      'Grossiste en lots de vêtements de seconde main basé en Moselle. Lots sélectionnés avec soin pour les revendeurs Vinted. Expédition rapide depuis la France.',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'ACA Wholesale - Lots de Vêtements de Seconde Main, Moselle, France',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACA Wholesale - Lots de Vêtements de Seconde Main | Moselle, France',
    description:
      'Grossiste en lots de vêtements de seconde main basé en Moselle. Lots sélectionnés avec soin pour les revendeurs Vinted. Expédition rapide depuis la France.',
    images: ['/og'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${inter.variable}`}>
        {/* Lien d'évitement pour navigation clavier / lecteurs d'écran */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-black focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          Aller au contenu principal
        </a>
        <I18nProvider>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
