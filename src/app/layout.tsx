import './globals.css';
import type { Metadata } from 'next';
import { PRODUCT, BRAND } from '@/lib/config';

export const metadata: Metadata = {
  title: `${PRODUCT} by ${BRAND}`,
  description: 'Family anywhere send photos, videos and messages to the TV in a rest home room. Nothing for the resident to learn.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hq = process.env.HQ_URL;
  return (
    <html lang="en-NZ">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap" />
        {hq && <script defer src={`${hq}/beacon.js`} data-product={process.env.HQ_PRODUCT || 'resthome'} />}
      </head>
      <body>{children}</body>
    </html>
  );
}
