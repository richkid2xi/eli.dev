import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import AstralCanvas from '../components/AstralCanvas';
import { getSiteUrl } from '../lib/siteUrl';

// Single primary display font — no Manrope preload waste
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const proggy = localFont({
  src: '../public/fonts/proggy.ttf',
  variable: '--font-proggy',
  display: 'swap',
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0C',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Richard Elikem Amenorpe | Technical Project Manager',
    template: '%s | Richard Elikem Amenorpe',
  },
  description:
    'Elikem Amenorpe, technical project manager & engineer in Accra, Ghana. Case studies on Klavora, Verdis, Beam & more.',
  keywords: [
    'Richard Elikem Amenorpe',
    'Richard Elikem',
    'Elikem Amenorpe',
    'Richard Amenorpe',
    'technical project manager Ghana',
    'software engineer Accra',
    'solutions engineer Ghana',
    'portfolio',
  ],
  authors: [{ name: 'Richard Elikem Amenorpe', url: siteUrl }],
  creator: 'Richard Elikem Amenorpe',
  publisher: 'Richard Elikem Amenorpe',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: siteUrl,
    siteName: 'Richard Elikem Amenorpe',
    title: 'Richard Elikem Amenorpe | Technical Project Manager',
    description:
      'Elikem Amenorpe, technical project manager & engineer in Accra, Ghana. Case studies on Klavora, Verdis, Beam & more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Richard Elikem Amenorpe | Technical Project Manager',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Richard Elikem Amenorpe | Technical Project Manager',
    description:
      'Elikem Amenorpe, technical project manager & engineer in Accra, Ghana. Case studies on Klavora, Verdis, Beam & more.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'CjrTi8yZVYAp1URq9r94HX-8er7LIIlYrDay-KfJ9Go',
    other: {
      'leaklens-verification': 'll_elidexvercelapp_dj61za',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${proggy.variable} antialiased`}
        suppressHydrationWarning
      >
        <AstralCanvas />
        {children}
      </body>
    </html>
  );
}
