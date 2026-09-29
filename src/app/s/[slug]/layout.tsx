import type { Metadata } from 'next';

// Every page of a family's screen (send link, family admin, QR card) is private: keep it out of search engines.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ScreenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
