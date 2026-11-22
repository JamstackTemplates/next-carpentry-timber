import '@fontsource/zilla-slab/600.css';
import '@fontsource/zilla-slab/700.css';
import '@fontsource/alegreya-sans/400.css';
import '@fontsource/alegreya-sans/500.css';
import '@fontsource/alegreya-sans/700.css';
import '@fontsource/reenie-beanie/400.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { site } from '../lib/site';
import './tailwind.input.css';

// metadataBase already includes the deployment base path.
const ogImagePath = site.url ? 'og.png' : undefined;
const siteDescription = site.description || business.introduction;

export const metadata: Metadata = {
  title: { default: `${business.name} — Custom furniture, kitchens & decks · Hobart`, template: `%s — ${business.name}` },
  description: siteDescription,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: `${business.name} — Hobart joinery workshop`,
    description: siteDescription,
    images: ogImagePath ? [{ url: ogImagePath, width: 1200, height: 630, alt: `${business.name} — Custom furniture, kitchens & decks · Hobart` }] : undefined,
  },
  twitter: {
    card: ogImagePath ? 'summary_large_image' : 'summary',
    title: `${business.name} — Hobart joinery workshop`,
    description: siteDescription,
    images: ogImagePath ? [ogImagePath] : undefined,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
