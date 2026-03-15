import './globals.css'

export const metadata = {
  title: 'ACA Wholesale - Ballots de Vêtements de Marque',
  description: 'Grossiste en ballots de vêtements de marque. Nike, Adidas, Ralph Lauren, The North Face et plus encore. Livraison dans toute l\'Europe.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
