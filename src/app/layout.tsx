import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'IngrédiCheck - Analysez vos produits alimentaires',
  description:
    'Explorez, filtrez et analysez des produits alimentaires avec IngrédiCheck. Découvrez la qualité nutritionnelle de vos aliments grâce aux données OpenFoodFacts.',
  keywords: [
    'nutrition',
    'aliments',
    'nutriscore',
    'nova',
    'openfoodfacts',
    'ingrédients',
    'santé',
  ],
  authors: [{ name: 'IngrédiCheck Team' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'IngrédiCheck - Analysez vos produits alimentaires',
    description:
      'Explorez et analysez la qualité nutritionnelle de vos produits alimentaires.',
    siteName: 'IngrédiCheck',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IngrédiCheck - Analysez vos produits alimentaires',
    description:
      'Explorez et analysez la qualité nutritionnelle de vos produits alimentaires.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>{children}</Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
