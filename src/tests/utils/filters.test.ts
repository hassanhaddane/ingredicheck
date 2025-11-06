import { describe, it, expect } from 'vitest';
import { applyFilters, sortProducts } from '@/lib/filters';
import { Product, SearchFilters } from '@/lib/schemas';

const mockProducts: Product[] = [
  {
    code: '1',
    product_name: 'Product A',
    nutriscore_grade: 'a',
    nova_group: 1,
    labels_tags: ['en:organic'],
    nutriments: { 'energy-kcal_100g': 100, sugars_100g: 5, fat_100g: 2, salt_100g: 0.5 },
  },
  {
    code: '2',
    product_name: 'Product B',
    nutriscore_grade: 'e',
    nova_group: 4,
    nutriments: { 'energy-kcal_100g': 500, sugars_100g: 50, fat_100g: 30, salt_100g: 3 },
  },
  {
    code: '3',
    product_name: 'Product C',
    nutriscore_grade: 'c',
    nova_group: 2,
    nutriments: { 'energy-kcal_100g': 250, sugars_100g: 15, fat_100g: 10, salt_100g: 1 },
  },
];

describe('Filter Utilities', () => {
  describe('applyFilters', () => {
    it('should return all products when no filters applied', () => {
      const result = applyFilters(mockProducts, {});
      expect(result).toHaveLength(3);
    });

    it('should filter by NutriScore', () => {
      const filters: SearchFilters = { nutriScore: ['a'] };
      const result = applyFilters(mockProducts, filters);
      expect(result).toHaveLength(1);
      expect(result[0].code).toBe('1');
    });

    it('should filter by NOVA group', () => {
      const filters: SearchFilters = { novaGroup: [1, 2] };
      const result = applyFilters(mockProducts, filters);
      expect(result).toHaveLength(2);
    });

    it('should filter by organic', () => {
      const filters: SearchFilters = { organic: true };
      const result = applyFilters(mockProducts, filters);
      expect(result).toHaveLength(1);
      expect(result[0].code).toBe('1');
    });

    it('should filter by max calories', () => {
      const filters: SearchFilters = { maxCalories: 200 };
      const result = applyFilters(mockProducts, filters);
      expect(result).toHaveLength(1);
      expect(result[0].code).toBe('1');
    });

    it('should apply multiple filters', () => {
      const filters: SearchFilters = {
        nutriScore: ['a', 'c'],
        maxCalories: 300,
      };
      const result = applyFilters(mockProducts, filters);
      expect(result).toHaveLength(2);
    });
  });

  describe('sortProducts', () => {
    it('should sort by NutriScore', () => {
      const result = sortProducts(mockProducts, 'nutriscore');
      expect(result[0].nutriscore_grade).toBe('a');
      expect(result[result.length - 1].nutriscore_grade).toBe('e');
    });

    it('should sort by NOVA group', () => {
      const result = sortProducts(mockProducts, 'nova');
      expect(result[0].nova_group).toBe(1);
      expect(result[result.length - 1].nova_group).toBe(4);
    });

    it('should sort by name', () => {
      const result = sortProducts(mockProducts, 'name');
      expect(result[0].product_name).toBe('Product A');
      expect(result[result.length - 1].product_name).toBe('Product C');
    });

    it('should sort by energy', () => {
      const result = sortProducts(mockProducts, 'energy');
      expect(result[0].nutriments?.['energy-kcal_100g']).toBe(100);
      expect(result[result.length - 1].nutriments?.['energy-kcal_100g']).toBe(500);
    });

    it('should not mutate original array', () => {
      const original = [...mockProducts];
      sortProducts(mockProducts, 'nutriscore');
      expect(mockProducts).toEqual(original);
    });
  });
});
