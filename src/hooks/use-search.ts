'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchFilters, SearchResponse } from '@/lib/schemas';

interface UseSearchOptions {
  query: string;
  filters?: SearchFilters;
  sortBy?: 'nutriscore' | 'nova' | 'name' | 'energy' | 'popularity';
  pageSize?: number;
  enabled?: boolean;
}

async function searchProducts(
  query: string,
  page: number,
  filters?: SearchFilters,
  sortBy?: string,
  pageSize: number = 24
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    query,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (sortBy) {
    params.append('sortBy', sortBy);
  }

  if (filters) {
    params.append('filters', JSON.stringify(filters));
  }

  const response = await fetch(`/api/search?${params}`);

  if (!response.ok) {
    throw new Error('Failed to search products');
  }

  return response.json();
}

export function useSearch({
  query,
  filters,
  sortBy = 'popularity',
  pageSize = 24,
  enabled = true,
}: UseSearchOptions) {
  return useInfiniteQuery({
    queryKey: ['products', query, filters, sortBy],
    queryFn: ({ pageParam = 1 }) => searchProducts(query, pageParam, filters, sortBy, pageSize),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.page_count) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: enabled && query.length > 0,
    initialPageParam: 1,
  });
}
