import { Product, ProductSchema, SearchResponse, SearchResponseSchema } from './schemas';

const OFF_API_URL = process.env.OPENFOODFACTS_API_URL || 'https://world.openfoodfacts.org';

export class OpenFoodFactsClient {
  private baseUrl: string;

  constructor(baseUrl: string = OFF_API_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Search for products
   */
  async searchProducts(
    query: string,
    page: number = 1,
    pageSize: number = 24
  ): Promise<SearchResponse> {
    const searchParams = new URLSearchParams({
      search_terms: query,
      page: page.toString(),
      page_size: pageSize.toString(),
      json: '1',
      fields:
        'code,product_name,brands,categories,labels,image_url,image_small_url,image_front_url,image_front_small_url,nutriscore_grade,nova_group,ecoscore_grade,nutriments,ingredients_text,allergens,traces,additives_tags,nutrient_levels,labels_tags,quantity,packaging,countries',
    });

    const response = await fetch(`${this.baseUrl}/cgi/search.pl?${searchParams}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`OpenFoodFacts API error: ${response.status}`);
    }

    const data = await response.json();
    return SearchResponseSchema.parse(data);
  }

  /**
   * Get product by barcode
   */
  async getProduct(code: string): Promise<Product | null> {
    const response = await fetch(`${this.baseUrl}/api/v2/product/${code}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`OpenFoodFacts API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 0 || !data.product) {
      return null;
    }

    return ProductSchema.parse(data.product);
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(
    category: string,
    page: number = 1,
    pageSize: number = 24
  ): Promise<SearchResponse> {
    const searchParams = new URLSearchParams({
      tagtype_0: 'categories',
      tag_contains_0: 'contains',
      tag_0: category,
      page: page.toString(),
      page_size: pageSize.toString(),
      json: '1',
      fields:
        'code,product_name,brands,categories,labels,image_url,image_small_url,nutriscore_grade,nova_group,ecoscore_grade',
    });

    const response = await fetch(`${this.baseUrl}/cgi/search.pl?${searchParams}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`OpenFoodFacts API error: ${response.status}`);
    }

    const data = await response.json();
    return SearchResponseSchema.parse(data);
  }
}

// Singleton instance
export const offClient = new OpenFoodFactsClient();
