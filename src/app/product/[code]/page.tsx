import { offClient } from '@/lib/openfoodfacts';
import { ProductDetailClient } from './product-detail-client';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{
    code: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { code } = await params;
  const product = await offClient.getProduct(code);

  if (!product) {
    return {
      title: 'Produit non trouvé - IngrédiCheck',
    };
  }

  return {
    title: `${product.product_name || 'Produit'} - IngrédiCheck`,
    description: `Découvrez les informations nutritionnelles de ${product.product_name || 'ce produit'}. Marque: ${product.brands || 'inconnu'}.`,
    openGraph: {
      title: `${product.product_name || 'Produit'} - IngrédiCheck`,
      description: `Informations nutritionnelles de ${product.product_name || 'ce produit'}`,
      images: product.image_url ? [{ url: product.image_url }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { code } = await params;
  const product = await offClient.getProduct(code);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
