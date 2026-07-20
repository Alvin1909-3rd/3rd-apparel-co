import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--ledger-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--ledger-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Ledger — Crypto, the easy way',
  description: 'A living guide to actually owning your money — no bank, no gatekeeper, no permission needed.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'The Ledger',
  },
  openGraph: {
    title: 'The Ledger — Crypto, the easy way',
    description: 'A living guide to actually owning your money — no bank, no gatekeeper, no permission needed.',
    siteName: '3rd Apparel Co',
    url: 'https://www.3rdapparelco.com/guide',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ledger — Crypto, the easy way',
    description: 'A living guide to actually owning your money — no bank, no gatekeeper, no permission needed.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0C0C0E',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${jetbrainsMono.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
