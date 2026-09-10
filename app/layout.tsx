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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Richard Elikem Amenorpe | Software Engineer & Technical Project Manager',
    template: '%s | Richard Elikem',
  },
  description:
    'Portfolio of Richard Elikem Amenorpe — Software Engineer, Technical Project Manager, and founder building scalable products for African markets. Creator of Klavora, Verdis, and NameCheckGH.',
  keywords: [
    'Richard Elikem',
    'Richard Elikem Amenorpe',
    'Richard Amenorpe',
    'Technical Project Manager',
    'Software Engineer Ghana',
    'Full Stack Developer Ghana',
    'SaaS founder Africa',
    'Klavora',
    'Verdis',
    'NameCheckGH',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Project Manager portfolio',
    'EliTech CreaTives',
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
    title: 'Richard Elikem Amenorpe | Software Engineer & Technical Project Manager',
    description:
      'Software Engineer, Technical Project Manager, and founder building scalable SaaS products for African markets. Explore my work on Klavora, Verdis, and NameCheckGH.',
    images: [
      {
        url: '/Profile.png',
        width: 1200,
        height: 630,
        alt: 'Richard Elikem Amenorpe — Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Richard Elikem Amenorpe | Software Engineer & Technical Project Manager',
    description:
      'Software Engineer, Technical Project Manager, and founder building scalable SaaS products for African markets.',
    images: ['/Profile.png'],
  },
  alternates: {
    canonical: siteUrl,
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
