import { NextRequest, NextResponse } from 'next/server';
import { offClient } from '@/lib/openfoodfacts';
import { SearchRequestSchema } from '@/lib/schemas';
import { applyFilters, sortProducts } from '@/lib/filters';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Parse search params
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '24');
    const sortBy = searchParams.get('sortBy') || 'popularity';

    // Parse filters
    const filters = searchParams.get('filters')
      ? JSON.parse(searchParams.get('filters')!)
      : undefined;

    // Validate request
    const validatedRequest = SearchRequestSchema.parse({
      query,
      page,
      pageSize,
      filters,
      sortBy,
    });

    // Search products from OpenFoodFacts
    const searchResults = await offClient.searchProducts(
      validatedRequest.query,
      validatedRequest.page,
      validatedRequest.pageSize
    );

    // Apply client-side filters
    let filteredProducts = searchResults.products;
    if (validatedRequest.filters) {
      filteredProducts = applyFilters(filteredProducts, validatedRequest.filters);
    }

    // Sort products
    filteredProducts = sortProducts(filteredProducts, validatedRequest.sortBy);

    // Log search to database
    const duration = Date.now() - startTime;
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      await prisma.searchLog.create({
        data: {
          query: validatedRequest.query,
          filters: validatedRequest.filters || {},
          results: filteredProducts.length,
          durationMs: duration,
          userId: user?.id,
        },
      });
    } catch (error) {
      console.error('Failed to log search:', error);
      // Don't fail the request if logging fails
    }

    return NextResponse.json({
      ...searchResults,
      products: filteredProducts,
      count: filteredProducts.length,
      durationMs: duration,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      {
        error: 'Failed to search products',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
