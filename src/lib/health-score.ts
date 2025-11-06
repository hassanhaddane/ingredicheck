import { Product } from './schemas';

/**
 * Calculate a health score for a product (0-100)
 * Higher score = healthier product
 */
export function calculateHealthScore(product: Product): number {
  let score = 50; // Start at neutral

  // NutriScore contribution (40%)
  if (product.nutriscore_grade) {
    const nutriScorePoints = {
      a: 20,
      b: 10,
      c: 0,
      d: -10,
      e: -20,
    };
    score += nutriScorePoints[product.nutriscore_grade as keyof typeof nutriScorePoints] || 0;
  }

  // NOVA group contribution (30%)
  if (product.nova_group) {
    const novaPoints = {
      1: 15,
      2: 5,
      3: -5,
      4: -15,
    };
    score += novaPoints[product.nova_group as keyof typeof novaPoints] || 0;
  }

  // Organic label contribution (10%)
  const isOrganic = product.labels_tags?.some(
    (label) => label.includes('organic') || label.includes('bio')
  );
  if (isOrganic) {
    score += 5;
  }

  // Palm oil free contribution (10%)
  const hasPalmOil =
    product.ingredients_text?.toLowerCase().includes('palm oil') ||
    product.ingredients_text?.toLowerCase().includes('huile de palme');
  if (!hasPalmOil && product.ingredients_text) {
    score += 5;
  }

  // Additives contribution (10%)
  const additivesCount = product.additives_tags?.length || 0;
  if (additivesCount === 0) {
    score += 5;
  } else if (additivesCount <= 3) {
    score += 2;
  } else if (additivesCount > 5) {
    score -= 5;
  }

  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, score));
}

/**
 * Get health score interpretation
 */
export function getHealthScoreLabel(score: number): {
  label: string;
  color: string;
  description: string;
} {
  if (score >= 80) {
    return {
      label: 'Excellent',
      color: 'text-green-600 dark:text-green-400',
      description: 'Très bon choix nutritionnel',
    };
  } else if (score >= 60) {
    return {
      label: 'Bon',
      color: 'text-lime-600 dark:text-lime-400',
      description: 'Bon choix nutritionnel',
    };
  } else if (score >= 40) {
    return {
      label: 'Moyen',
      color: 'text-yellow-600 dark:text-yellow-400',
      description: 'À consommer avec modération',
    };
  } else if (score >= 20) {
    return {
      label: 'Médiocre',
      color: 'text-orange-600 dark:text-orange-400',
      description: 'Qualité nutritionnelle faible',
    };
  } else {
    return {
      label: 'Mauvais',
      color: 'text-red-600 dark:text-red-400',
      description: 'Qualité nutritionnelle très faible',
    };
  }
}

/**
 * Get NutriScore color
 */
export function getNutriScoreColor(grade?: string): string {
  const colors = {
    a: 'bg-green-500',
    b: 'bg-lime-500',
    c: 'bg-yellow-500',
    d: 'bg-orange-500',
    e: 'bg-red-500',
  };
  return grade ? colors[grade as keyof typeof colors] || 'bg-gray-400' : 'bg-gray-400';
}

/**
 * Get NOVA group color
 */
export function getNovaGroupColor(group?: number): string {
  const colors = {
    1: 'bg-green-500',
    2: 'bg-yellow-500',
    3: 'bg-orange-500',
    4: 'bg-red-500',
  };
  return group ? colors[group as keyof typeof colors] || 'bg-gray-400' : 'bg-gray-400';
}

/**
 * Get NOVA group label
 */
export function getNovaGroupLabel(group?: number): string {
  const labels = {
    1: 'Aliments non transformés',
    2: 'Ingrédients culinaires',
    3: 'Aliments transformés',
    4: 'Aliments ultra-transformés',
  };
  return group ? labels[group as keyof typeof labels] || 'Inconnu' : 'Inconnu';
}
