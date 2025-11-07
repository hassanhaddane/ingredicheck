import { describe, it, expect } from 'vitest';
import {
  calculateHealthScore,
  getHealthScoreLabel,
  getNutriScoreColor,
  getNovaGroupColor,
  getNovaGroupLabel,
} from '@/lib/health-score';
import { Product } from '@/lib/schemas';

describe('Health Score Utilities', () => {
  describe('calculateHealthScore', () => {
    it('should calculate score for product with NutriScore A', () => {
      const product: Product = {
        code: '123',
        nutriscore_grade: 'a',
      };
      const score = calculateHealthScore(product);
      expect(score).toBeGreaterThan(60);
    });

    it('should calculate score for product with NutriScore E', () => {
      const product: Product = {
        code: '123',
        nutriscore_grade: 'e',
      };
      const score = calculateHealthScore(product);
      expect(score).toBeLessThan(40);
    });

    it('should calculate score for product with NOVA group 1', () => {
      const product: Product = {
        code: '123',
        nova_group: 1,
      };
      const score = calculateHealthScore(product);
      expect(score).toBeGreaterThan(60);
    });

    it('should calculate score for product with NOVA group 4', () => {
      const product: Product = {
        code: '123',
        nova_group: 4,
      };
      const score = calculateHealthScore(product);
      expect(score).toBeLessThanOrEqual(40);
    });

    it('should boost score for organic products', () => {
      const productWithoutOrganic: Product = {
        code: '123',
        nutriscore_grade: 'c',
      };
      const productWithOrganic: Product = {
        code: '123',
        nutriscore_grade: 'c',
        labels_tags: ['en:organic'],
      };

      const scoreWithout = calculateHealthScore(productWithoutOrganic);
      const scoreWith = calculateHealthScore(productWithOrganic);

      expect(scoreWith).toBeGreaterThan(scoreWithout);
    });

    it('should clamp score between 0 and 100', () => {
      const product: Product = {
        code: '123',
        nutriscore_grade: 'a',
        nova_group: 1,
        labels_tags: ['en:organic'],
      };
      const score = calculateHealthScore(product);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  describe('getHealthScoreLabel', () => {
    it('should return Excellent for score >= 80', () => {
      const result = getHealthScoreLabel(85);
      expect(result.label).toBe('Excellent');
    });

    it('should return Bon for score >= 60', () => {
      const result = getHealthScoreLabel(65);
      expect(result.label).toBe('Bon');
    });

    it('should return Moyen for score >= 40', () => {
      const result = getHealthScoreLabel(45);
      expect(result.label).toBe('Moyen');
    });

    it('should return Médiocre for score >= 20', () => {
      const result = getHealthScoreLabel(25);
      expect(result.label).toBe('Médiocre');
    });

    it('should return Mauvais for score < 20', () => {
      const result = getHealthScoreLabel(15);
      expect(result.label).toBe('Mauvais');
    });
  });

  describe('getNutriScoreColor', () => {
    it('should return correct color for grade A', () => {
      expect(getNutriScoreColor('a')).toBe('bg-green-500');
    });

    it('should return correct color for grade E', () => {
      expect(getNutriScoreColor('e')).toBe('bg-red-500');
    });

    it('should return default color for unknown grade', () => {
      expect(getNutriScoreColor(undefined)).toBe('bg-gray-400');
    });
  });

  describe('getNovaGroupColor', () => {
    it('should return correct color for group 1', () => {
      expect(getNovaGroupColor(1)).toBe('bg-green-500');
    });

    it('should return correct color for group 4', () => {
      expect(getNovaGroupColor(4)).toBe('bg-red-500');
    });

    it('should return default color for undefined', () => {
      expect(getNovaGroupColor(undefined)).toBe('bg-gray-400');
    });
  });

  describe('getNovaGroupLabel', () => {
    it('should return correct label for group 1', () => {
      expect(getNovaGroupLabel(1)).toBe('Aliments non transformés');
    });

    it('should return correct label for group 4', () => {
      expect(getNovaGroupLabel(4)).toBe('Aliments ultra-transformés');
    });

    it('should return Inconnu for undefined', () => {
      expect(getNovaGroupLabel(undefined)).toBe('Inconnu');
    });
  });
});
