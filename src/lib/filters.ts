import { Product, SearchFilters } from './schemas';

/**
 * Apply filters to products client-side
 */
export function applyFilters(products: Product[], filters?: SearchFilters): Product[] {
  if (!filters) return products;

  return products.filter((product) => {
    // NutriScore filter
    if (filters.nutriScore && filters.nutriScore.length > 0) {
      if (
        !product.nutriscore_grade ||
        !filters.nutriScore.includes(product.nutriscore_grade as 'a' | 'b' | 'c' | 'd' | 'e')
      ) {
        return false;
      }
    }

    // NOVA group filter
    if (filters.novaGroup && filters.novaGroup.length > 0) {
      if (!product.nova_group || !filters.novaGroup.includes(product.nova_group)) {
        return false;
      }
    }

    // Organic filter
    if (filters.organic) {
      const isOrganic = product.labels_tags?.some(
        (label) => label.includes('organic') || label.includes('bio')
      );
      if (!isOrganic) return false;
    }

    // Palm oil free filter
    if (filters.palmOilFree) {
      const hasPalmOil =
        product.ingredients_text?.toLowerCase().includes('palm oil') ||
        product.ingredients_text?.toLowerCase().includes('huile de palme');
      if (hasPalmOil) return false;
    }

    // Max calories filter
    if (filters.maxCalories !== undefined) {
      const calories = product.nutriments?.['energy-kcal_100g'];
      if (calories === undefined || calories > filters.maxCalories) {
        return false;
      }
    }

    // Max sugars filter
    if (filters.maxSugars !== undefined) {
      const sugars = product.nutriments?.sugars_100g;
      if (sugars === undefined || sugars > filters.maxSugars) {
        return false;
      }
    }

    // Max fat filter
    if (filters.maxFat !== undefined) {
      const fat = product.nutriments?.fat_100g;
      if (fat === undefined || fat > filters.maxFat) {
        return false;
      }
    }

    // Max salt filter
    if (filters.maxSalt !== undefined) {
      const salt = product.nutriments?.salt_100g;
      if (salt === undefined || salt > filters.maxSalt) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort products
 */
export function sortProducts(
  products: Product[],
  sortBy: 'nutriscore' | 'nova' | 'name' | 'energy' | 'popularity'
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'nutriscore':
      sorted.sort((a, b) => {
        const gradeOrder = { a: 1, b: 2, c: 3, d: 4, e: 5 };
        const gradeA = a.nutriscore_grade
          ? (gradeOrder[a.nutriscore_grade as keyof typeof gradeOrder] ?? 999)
          : 999;
        const gradeB = b.nutriscore_grade
          ? (gradeOrder[b.nutriscore_grade as keyof typeof gradeOrder] ?? 999)
          : 999;
        return gradeA - gradeB;
      });
      break;

    case 'nova':
      sorted.sort((a, b) => {
        const novaA = a.nova_group || 999;
        const novaB = b.nova_group || 999;
        return novaA - novaB;
      });
      break;

    case 'name':
      sorted.sort((a, b) => {
        const nameA = a.product_name || '';
        const nameB = b.product_name || '';
        return nameA.localeCompare(nameB);
      });
      break;

    case 'energy':
      sorted.sort((a, b) => {
        const energyA = a.nutriments?.['energy-kcal_100g'] || 0;
        const energyB = b.nutriments?.['energy-kcal_100g'] || 0;
        return energyA - energyB;
      });
      break;

    case 'popularity':
    default:
      // Keep original order (API already sorts by popularity)
      break;
  }

  return sorted;
}
