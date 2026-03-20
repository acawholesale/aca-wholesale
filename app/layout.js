import './globals.css'
import { CartProvider } from '../context/CartContext'

export const metadata = {
  title: 'ACA Wholesale - Lots de Vêtements de Seconde Main | Moselle, France',
  description: 'Grossiste en lots de vêtements de seconde main basé en Moselle. Lots sélectionnés avec soin pour les revendeurs Vinted. Expédition rapide depuis la France. Nike, Adidas, Ralph Lauren et plus.',
  keywords: 'vêtements seconde main, lots vêtements, grossiste vinted, wholesale vêtements, revendeur vinted, ballots vêtements marque, moselle',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
