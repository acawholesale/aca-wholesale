import './globals.css'
import { CartProvider } from '../context/CartContext'
import CartReminder from '../components/CartReminder'
import ScrollObserver from '../components/ScrollObserver'
import PageTransition from '../components/PageTransition'

export const metadata = {
  title: 'ACA Wholesale - Lots de Vêtements de Seconde Main | Moselle, France',
  description: 'Grossiste en lots de vêtements de seconde main basé en Moselle. Lots sélectionnés avec soin pour les revendeurs Vinted. Expédition rapide depuis la France. Nike, Adidas, Ralph Lauren et plus.',
  keywords: 'vêtements seconde main, lots vêtements, grossiste vinted, wholesale vêtements, revendeur vinted, ballots vêtements marque, moselle',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <CartReminder />
          <ScrollObserver />
          <PageTransition>
            {children}
          </PageTransition>
        </CartProvider>
      </body>
    </html>
  )
}
