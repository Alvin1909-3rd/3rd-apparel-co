import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Ledger — Crypto, the easy way',
    short_name: 'The Ledger',
    description: 'A living guide to actually owning your money — no bank, no gatekeeper, no permission needed.',
    start_url: '/guide',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0C0C0E',
    theme_color: '#0C0C0E',
    categories: ['education', 'finance'],
    icons: [
      {
        src: '/icons/ledger-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/ledger-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
