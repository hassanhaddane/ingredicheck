import { z } from 'zod';

// Nutriments schema
export const NutrimentsSchema = z.object({
  'energy-kcal_100g': z.number().optional(),
  'energy-kj_100g': z.number().optional(),
  fat_100g: z.number().optional(),
  'saturated-fat_100g': z.number().optional(),
  carbohydrates_100g: z.number().optional(),
  sugars_100g: z.number().optional(),
  fiber_100g: z.number().optional(),
  proteins_100g: z.number().optional(),
  salt_100g: z.number().optional(),
  sodium_100g: z.number().optional(),
});

export type Nutriments = z.infer<typeof NutrimentsSchema>;

// Product schema from OpenFoodFacts
export const ProductSchema = z.object({
  code: z.string(),
  product_name: z.string().optional(),
  brands: z.string().optional(),
  categories: z.string().optional(),
  labels: z.string().optional(),
  image_url: z.string().url().optional(),
  image_small_url: z.string().url().optional(),
  image_front_url: z.string().url().optional(),
  image_front_small_url: z.string().url().optional(),
  nutriscore_grade: z.string().optional(),
  nova_group: z.number().min(1).max(4).optional(),
  ecoscore_grade: z.string().optional(),
  nutriments: NutrimentsSchema.optional(),
  ingredients_text: z.string().optional(),
  allergens: z.string().optional(),
  traces: z.string().optional(),
  additives_tags: z.array(z.string()).optional(),
  nutrient_levels: z
    .object({
      fat: z.string().optional(),
      salt: z.string().optional(),
      'saturated-fat': z.string().optional(),
      sugars: z.string().optional(),
    })
    .optional(),
  labels_tags: z.array(z.string()).optional(),
  quantity: z.string().optional(),
  packaging: z.string().optional(),
  countries: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

// Search response schema
export const SearchResponseSchema = z.object({
  count: z.number(),
  page: z.number(),
  page_count: z.number(),
  page_size: z.number(),
  products: z.array(ProductSchema),
});

export type SearchResponse = z.infer<typeof SearchResponseSchema>;

// Search filters
export const SearchFiltersSchema = z.object({
  nutriScore: z.array(z.enum(['a', 'b', 'c', 'd', 'e'])).optional(),
  novaGroup: z.array(z.number().min(1).max(4)).optional(),
  organic: z.boolean().optional(),
  palmOilFree: z.boolean().optional(),
  maxCalories: z.number().min(0).optional(),
  maxSugars: z.number().min(0).optional(),
  maxFat: z.number().min(0).optional(),
  maxSalt: z.number().min(0).optional(),
});

export type SearchFilters = z.infer<typeof SearchFiltersSchema>;

// API request/response schemas
export const SearchRequestSchema = z.object({
  query: z.string().min(1),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(24),
  filters: SearchFiltersSchema.optional(),
  sortBy: z
    .enum(['nutriscore', 'nova', 'name', 'energy', 'popularity'])
    .optional()
    .default('popularity'),
});

export type SearchRequest = z.infer<typeof SearchRequestSchema>;

// Favorite schemas
export const CreateFavoriteSchema = z.object({
  productId: z.string(),
  productName: z.string(),
});

export type CreateFavorite = z.infer<typeof CreateFavoriteSchema>;

// Health score calculation weights
export const HEALTH_SCORE_WEIGHTS = {
  nutriScore: 0.4,
  novaGroup: 0.3,
  organic: 0.1,
  palmOilFree: 0.1,
  additives: 0.1,
} as const;

// Allergen list
export const COMMON_ALLERGENS = [
  'gluten',
  'lait',
  'milk',
  'œufs',
  'eggs',
  'soja',
  'soy',
  'arachides',
  'peanuts',
  'fruits à coque',
  'tree nuts',
  'noix',
  'poisson',
  'fish',
  'crustacés',
  'shellfish',
  'céleri',
  'celery',
  'moutarde',
  'mustard',
  'sésame',
  'sesame',
  'sulfites',
  'lupin',
  'mollusques',
  'molluscs',
] as const;
