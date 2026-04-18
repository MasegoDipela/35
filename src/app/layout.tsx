import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Written in Light',
  description: 'A birthday letter, told in chapters.',
  metadataBase: new URL('https://tshegofatsomogotsi.com'),
  openGraph: {
    title: 'Written in Light',
    description: 'A birthday letter, told in chapters.',
    url: 'https://tshegofatsomogotsi.com',
    siteName: 'Written in Light',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Written in Light',
    description: 'A birthday letter, told in chapters.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      {/* Chapter ∅ — "The best stories are the ones someone builds for you in secret." */}
      <body className="paper-texture">
        {children}
      </body>
    </html>
  );
}
