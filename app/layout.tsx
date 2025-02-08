import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import localFont from 'next/font/local';
import orchidLogo from '@/components/navigation/img2.png';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  display: 'swap',
  variable: '--font-cormorant'
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const instrumentSerif = localFont({
  src: '../public/fonts/InstrumentSerif-Regular.ttf',
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'Orchid',
  description: 'Customer Intelligence Platform',
  icons: {
    icon: orchidLogo.src,
    shortcut: orchidLogo.src,
    apple: orchidLogo.src,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className={`${cormorant.variable} ${outfit.variable} ${instrumentSerif.variable} font-outfit`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}