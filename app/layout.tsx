import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

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

const siteUrl = 'https://richardelikem.com'; // update when deployed

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Richard Elikem | Software Engineer & Tech PM',
    template: '%s | Richard Elikem',
  },
  description:
    'Software Engineer & Technical Project Manager building scalable SaaS products for African markets. Creator of Klavora & Verdis.',
  keywords: [
    'Richard Elikem',
    'Richard Elikem Amenorpe',
    'Technical Project Manager',
    'Software Engineer Ghana',
    'SaaS founder Africa',
    'Klavora',
    'Verdis',
    'NameCheckGH',
    'React Developer',
    'Next.js Developer',
  ],
  authors: [{ name: 'Richard Elikem Amenorpe', url: siteUrl }],
  creator: 'Richard Elikem Amenorpe',
  publisher: 'EliTech CreaTives Limited',
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
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Richard Elikem — Portfolio',
    title: 'Richard Elikem | Software Engineer & Tech PM',
    description:
      'Software Engineer & Technical Project Manager building scalable SaaS products for African markets.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Richard Elikem Amenorpe — Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Richard Elikem | Software Engineer & Tech PM',
    description:
      'Software Engineer & Technical Project Manager building scalable SaaS products for African markets.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'en-US': '/en-US',
    },
  },
  verification: {
    google: 'CjrTi8yZVYAp1URq9r94HX-8er7LIIlYrDay-KfJ9Go',
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
        {children}
      </body>
    </html>
  );
}
