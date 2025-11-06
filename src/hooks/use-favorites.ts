'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/lib/schemas';
import { useToast } from './use-toast';

interface Favorite {
  id: string;
  productId: string;
  productName: string;
  userId: string;
  createdAt: string;
}

async function getFavorites(): Promise<Favorite[]> {
  const response = await fetch('/api/favorites');

  if (!response.ok) {
    if (response.status === 401) {
      return [];
    }
    throw new Error('Failed to fetch favorites');
  }

  return response.json();
}

async function addFavorite(product: Product): Promise<Favorite> {
  const response = await fetch('/api/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: product.code,
      productName: product.product_name || 'Unknown product',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add favorite');
  }

  return response.json();
}

async function removeFavorite(productId: string): Promise<void> {
  const response = await fetch(`/api/favorites?productId=${productId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to remove favorite');
  }
}

export function useFavorites() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  });

  const addMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast({
        title: 'Favori ajouté',
        description: 'Le produit a été ajouté à vos favoris.',
      });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le produit aux favoris. Connectez-vous d\'abord.',
        variant: 'destructive',
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast({
        title: 'Favori retiré',
        description: 'Le produit a été retiré de vos favoris.',
      });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Impossible de retirer le produit des favoris.',
        variant: 'destructive',
      });
    },
  });

  const isFavorite = (productId: string) => {
    return favorites.some((fav) => fav.productId === productId);
  };

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.code)) {
      removeMutation.mutate(product.code);
    } else {
      addMutation.mutate(product);
    }
  };

  return {
    favorites,
    isLoading,
    isFavorite,
    toggleFavorite,
    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
  };
}
