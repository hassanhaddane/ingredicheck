'use client';

import { Product } from '@/lib/schemas';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getNutriScoreColor, getNovaGroupColor } from '@/lib/health-score';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
}

export function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  const imageUrl = product.image_front_small_url || product.image_small_url || product.image_url;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <Link href={`/product/${product.code}`}>
        <div className="relative aspect-square bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.product_name || 'Product image'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}

          {/* Favorite button */}
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(product);
              }}
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </Button>
          )}

          {/* Badges overlay */}
          <div className="absolute bottom-2 left-2 flex gap-1">
            {product.nutriscore_grade && (
              <Badge
                className={`${getNutriScoreColor(product.nutriscore_grade)} text-white uppercase font-bold`}
              >
                {product.nutriscore_grade}
              </Badge>
            )}
            {product.nova_group && (
              <Badge className={`${getNovaGroupColor(product.nova_group)} text-white font-bold`}>
                NOVA {product.nova_group}
              </Badge>
            )}
          </div>

          {/* Organic badge */}
          {product.labels_tags?.some((l) => l.includes('organic') || l.includes('bio')) && (
            <Badge className="absolute top-2 left-2 bg-green-600 text-white">Bio</Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/product/${product.code}`}>
          <h3 className="font-semibold line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.product_name || 'Nom inconnu'}
          </h3>
          {product.brands && (
            <p className="text-sm text-muted-foreground line-clamp-1">{product.brands}</p>
          )}
          {product.quantity && (
            <p className="text-xs text-muted-foreground mt-1">{product.quantity}</p>
          )}
        </Link>
      </CardContent>
    </Card>
  );
}
