import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import EmailCapturePopup from '@/components/EmailCapturePopup'
import CartDrawer from '@/components/CartDrawer'
import ConditionalChrome from '@/components/ConditionalChrome'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: '3rd Apparel Co | Baltimore Streetwear',
  description: 'Culture. Arts. History. Premium private label apparel and accessories from Baltimore, MD.',
  openGraph: {
    title: '3rd Apparel Co | Baltimore Streetwear',
    description: 'Culture. Arts. History. Premium private label apparel from Baltimore, MD.',
    siteName: '3rd Apparel Co',
    url: 'https://www.3rdapparelco.com',
    type: 'website',
    images: [
      {
        url: 'https://xakihabewfanylylcwqw.supabase.co/storage/v1/object/public/site-images/feed/Img1.jpg',
        width: 1200,
        height: 630,
        alt: '3rd Apparel Co — Baltimore Streetwear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3rd Apparel Co | Baltimore Streetwear',
    description: 'Culture. Arts. History. Premium private label apparel from Baltimore, MD.',
    images: ['https://xakihabewfanylylcwqw.supabase.co/storage/v1/object/public/site-images/feed/Img1.jpg'],
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
          <ConditionalChrome>
            <Navbar />
          </ConditionalChrome>
          <main className="flex-1">{children}</main>
          <ConditionalChrome>
            <Footer />
            <EmailCapturePopup />
            <CartDrawer />
          </ConditionalChrome>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
