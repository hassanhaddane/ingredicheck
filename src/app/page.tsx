'use client';

import { useState, useEffect } from 'react';
import { useSearch } from '@/hooks/use-search';
import { useFavorites } from '@/hooks/use-favorites';
import { SearchBar } from '@/components/features/search-bar';
import { ProductCard } from '@/components/features/product-card';
import { ProductFilters } from '@/components/features/product-filters';
import { ThemeToggle } from '@/components/theme-toggle';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { SearchFilters } from '@/lib/schemas';
import { Loader2, Heart, Sparkles } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import Link from 'next/link';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<'nutriscore' | 'nova' | 'name' | 'energy' | 'popularity'>(
    'popularity'
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useSearch({
    query,
    filters,
    sortBy,
    enabled: query.length > 0,
  });

  const { isFavorite, toggleFavorite } = useFavorites();
  const { ref, inView } = useInView();

  // Auto-fetch next page when scrolling
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allProducts = data?.pages.flatMap((page) => page.products) || [];
  const totalResults = data?.pages[0]?.count || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
                IngrédiCheck
              </h1>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/favorites">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Analysez vos produits alimentaires
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explorez des milliers de produits, filtrez par qualité nutritionnelle et découvrez ce
            que vous mangez vraiment.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={setQuery} defaultValue={query} />
        </div>

        {/* Filters and Sort */}
        {query && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
                onReset={() => setFilters({})}
              />

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Trier par:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="border rounded-md px-3 py-2 text-sm bg-background"
                >
                  <option value="popularity">Popularité</option>
                  <option value="nutriscore">NutriScore</option>
                  <option value="nova">Groupe NOVA</option>
                  <option value="name">Nom</option>
                  <option value="energy">Calories</option>
                </select>
              </div>
            </div>

            {!isLoading && totalResults > 0 && (
              <p className="text-sm text-muted-foreground">
                {totalResults} résultat{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Results */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <p className="text-red-500">
              Une erreur est survenue lors de la recherche. Veuillez réessayer.
            </p>
          </div>
        )}

        {!isLoading && !isError && query && allProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Aucun produit trouvé. Essayez de modifier votre recherche ou vos filtres.
            </p>
          </div>
        )}

        {!isLoading && !isError && allProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <ProductCard
                  key={product.code}
                  product={product}
                  isFavorite={isFavorite(product.code)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            {/* Infinite scroll trigger */}
            {hasNextPage && (
              <div ref={ref} className="flex justify-center mt-8">
                {isFetchingNextPage && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Chargement...</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!query && (
          <div className="text-center py-12 space-y-6">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Commencez votre recherche</h3>
              <p className="text-muted-foreground">
                Recherchez un produit par son nom, sa marque ou son code-barres pour découvrir ses
                informations nutritionnelles.
              </p>
            </div>

            {/* Popular searches suggestions */}
            <div className="max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-3">Suggestions de recherche :</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Nutella', 'Coca Cola', 'Danone', 'Haribo', 'Kinder'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Données fournies par{' '}
            <a
              href="https://world.openfoodfacts.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              OpenFoodFacts
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
