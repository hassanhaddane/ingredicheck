'use client';

import { Product } from '@/lib/schemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { AllergenHighlighter } from '@/components/features/allergen-highlighter';
import { useFavorites } from '@/hooks/use-favorites';
import {
  calculateHealthScore,
  getHealthScoreLabel,
  getNutriScoreColor,
  getNovaGroupColor,
  getNovaGroupLabel,
} from '@/lib/health-score';
import { ArrowLeft, Heart, ExternalLink, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const healthScore = calculateHealthScore(product);
  const healthInfo = getHealthScoreLabel(healthScore);

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

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                {/* Product Image */}
                <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.product_name || 'Product image'}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Aucune image disponible
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <h1 className="text-2xl font-bold mb-2">
                  {product.product_name || 'Nom inconnu'}
                </h1>
                {product.brands && (
                  <p className="text-lg text-muted-foreground mb-4">{product.brands}</p>
                )}

                {/* Favorite Button */}
                <Button
                  variant={isFavorite(product.code) ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => toggleFavorite(product)}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${
                      isFavorite(product.code) ? 'fill-current' : ''
                    }`}
                  />
                  {isFavorite(product.code) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </Button>

                {/* External Link */}
                <a
                  href={`https://world.openfoodfacts.org/product/${product.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4"
                >
                  <Button variant="ghost" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Voir sur OpenFoodFacts
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Health Score Card */}
            <Card>
              <CardHeader>
                <CardTitle>Score Santé</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={`${(healthScore / 100) * 351.86} 351.86`}
                        className={healthInfo.color}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold">{healthScore}</span>
                      <span className="text-xs text-muted-foreground">/ 100</span>
                    </div>
                  </div>
                  <div>
                    <p className={`text-lg font-semibold ${healthInfo.color}`}>
                      {healthInfo.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{healthInfo.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scores Card */}
            <Card>
              <CardHeader>
                <CardTitle>Scores Nutritionnels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* NutriScore */}
                {product.nutriscore_grade && (
                  <div>
                    <h3 className="font-semibold mb-2">NutriScore</h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getNutriScoreColor(product.nutriscore_grade)} text-white uppercase text-lg px-4 py-2`}
                      >
                        {product.nutriscore_grade}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Qualité nutritionnelle globale
                      </span>
                    </div>
                  </div>
                )}

                {/* NOVA Group */}
                {product.nova_group && (
                  <div>
                    <h3 className="font-semibold mb-2">Groupe NOVA</h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getNovaGroupColor(product.nova_group)} text-white text-lg px-4 py-2`}
                      >
                        {product.nova_group}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {getNovaGroupLabel(product.nova_group)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Eco Score */}
                {product.ecoscore_grade && (
                  <div>
                    <h3 className="font-semibold mb-2">Eco-Score</h3>
                    <Badge className="uppercase text-lg px-4 py-2">
                      {product.ecoscore_grade}
                    </Badge>
                  </div>
                )}

                {/* Labels */}
                {product.labels_tags && product.labels_tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Labels</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.labels_tags.slice(0, 5).map((label) => (
                        <Badge key={label} variant="outline">
                          {label.replace(/^en:/, '')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Nutrition Table */}
            {product.nutriments && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations Nutritionnelles</CardTitle>
                  <p className="text-sm text-muted-foreground">Pour 100g/100ml</p>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <tbody className="divide-y">
                      {product.nutriments['energy-kcal_100g'] !== undefined && (
                        <tr>
                          <td className="py-2 font-medium">Énergie</td>
                          <td className="py-2 text-right">
                            {product.nutriments['energy-kcal_100g'].toFixed(0)} kcal
                          </td>
                        </tr>
                      )}
                      {product.nutriments.fat_100g !== undefined && (
                        <tr>
                          <td className="py-2 font-medium">Matières grasses</td>
                          <td className="py-2 text-right">
                            {product.nutriments.fat_100g.toFixed(1)} g
                          </td>
                        </tr>
                      )}
                      {product.nutriments['saturated-fat_100g'] !== undefined && (
                        <tr>
                          <td className="py-2 pl-4 text-sm">dont acides gras saturés</td>
                          <td className="py-2 text-right text-sm">
                            {product.nutriments['saturated-fat_100g'].toFixed(1)} g
                          </td>
                        </tr>
                      )}
                      {product.nutriments.carbohydrates_100g !== undefined && (
                        <tr>
                          <td className="py-2 font-medium">Glucides</td>
                          <td className="py-2 text-right">
                            {product.nutriments.carbohydrates_100g.toFixed(1)} g
                          </td>
                        </tr>
                      )}
                      {product.nutriments.sugars_100g !== undefined && (
                        <tr>
                          <td className="py-2 pl-4 text-sm">dont sucres</td>
                          <td className="py-2 text-right text-sm">
                            {product.nutriments.sugars_100g.toFixed(1)} g
                          </td>
                        </tr>
                      )}
                      {product.nutriments.fiber_100g !== undefined && (
                        <tr>
                          <td className="py-2 font-medium">Fibres</td>
                          <td className="py-2 text-right">
                            {product.nutriments.fiber_100g.toFixed(1)} g
                          </td>
                        </tr>
                      )}
                      {product.nutriments.proteins_100g !== undefined && (
                        <tr>
                          <td className="py-2 font-medium">Protéines</td>
                          <td className="py-2 text-right">
                            {product.nutriments.proteins_100g.toFixed(1)} g
                          </td>
                        </tr>
                      )}
                      {product.nutriments.salt_100g !== undefined && (
                        <tr>
                          <td className="py-2 font-medium">Sel</td>
                          <td className="py-2 text-right">
                            {product.nutriments.salt_100g.toFixed(2)} g
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}

            {/* Ingredients */}
            {product.ingredients_text && (
              <Card>
                <CardHeader>
                  <CardTitle>Ingrédients</CardTitle>
                </CardHeader>
                <CardContent>
                  <AllergenHighlighter
                    text={product.ingredients_text}
                    className="text-sm leading-relaxed"
                  />
                  {(product.allergens || product.traces) && (
                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                            Allergènes
                          </p>
                          {product.allergens && (
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                              <strong>Contient:</strong> {product.allergens}
                            </p>
                          )}
                          {product.traces && (
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                              <strong>Traces possibles:</strong> {product.traces}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Additives */}
            {product.additives_tags && product.additives_tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Additifs ({product.additives_tags.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product.additives_tags.map((additive) => (
                      <Badge key={additive} variant="secondary">
                        {additive.replace(/^en:/, '')}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations Complémentaires</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {product.quantity && (
                  <div>
                    <span className="font-semibold">Quantité:</span> {product.quantity}
                  </div>
                )}
                {product.packaging && (
                  <div>
                    <span className="font-semibold">Emballage:</span> {product.packaging}
                  </div>
                )}
                {product.categories && (
                  <div>
                    <span className="font-semibold">Catégories:</span> {product.categories}
                  </div>
                )}
                {product.countries && (
                  <div>
                    <span className="font-semibold">Pays de vente:</span> {product.countries}
                  </div>
                )}
                <div>
                  <span className="font-semibold">Code-barres:</span> {product.code}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
