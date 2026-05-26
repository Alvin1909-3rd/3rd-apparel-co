import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import EmailCapturePopup from '@/components/EmailCapturePopup'
import CartDrawer from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: '3rd Apparel Co | Baltimore Streetwear',
  description: 'Culture. Arts. History. Premium private label apparel and accessories from Baltimore, MD.',
  openGraph: {
    title: '3rd Apparel Co',
    description: 'Culture. Arts. History. Premium private label apparel from Baltimore, MD.',
    siteName: '3rd Apparel Co',
  },
}

const PIXEL_ID = '1079854902525600'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${PIXEL_ID}');
              fbq('track','PageView');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#0e0e0e', color: '#f0ece4' }}>
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <EmailCapturePopup />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
