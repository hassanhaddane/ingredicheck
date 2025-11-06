'use client';

import { useFavorites } from '@/hooks/use-favorites';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/lib/schemas';
import { ProductCard } from '@/components/features/product-card';
import { ThemeToggle } from '@/components/theme-toggle';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';

async function fetchProduct(code: string): Promise<Product | null> {
  const response = await fetch(`/api/product/${code}`);
  if (!response.ok) return null;
  return response.json();
}

export default function FavoritesPage() {
  const { favorites, isLoading: favoritesLoading, toggleFavorite, isFavorite } = useFavorites();

  // Fetch all favorite products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['favorite-products', favorites.map((f) => f.productId).join(',')],
    queryFn: async () => {
      if (favorites.length === 0) return [];
      const productPromises = favorites.map((fav) => fetchProduct(fav.productId));
      const results = await Promise.all(productPromises);
      return results.filter((p): p is Product => p !== null);
    },
    enabled: favorites.length > 0,
  });

  const isLoading = favoritesLoading || productsLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            Mes Favoris
          </h1>
          <p className="text-muted-foreground">
            {favorites.length} produit{favorites.length > 1 ? 's' : ''} sauvegardé
            {favorites.length > 1 ? 's' : ''}
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && favorites.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Aucun favori</h3>
              <p className="text-muted-foreground mb-6">
                Vous n&apos;avez pas encore de produits favoris. Explorez des produits et ajoutez-les à
                vos favoris pour les retrouver facilement !
              </p>
              <Link href="/">
                <Button>Explorer les produits</Button>
              </Link>
            </div>
          </div>
        )}

        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.code}
                product={product}
                isFavorite={isFavorite(product.code)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
