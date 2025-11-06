import { test, expect } from '@playwright/test';

test.describe('Product Search', () => {
  test('should display search bar on homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByPlaceholder('Rechercher un produit...')).toBeVisible();
  });

  test('should search for products', async ({ page }) => {
    await page.goto('/');

    // Fill search input
    await page.getByPlaceholder('Rechercher un produit...').fill('Nutella');

    // Click search button
    await page.getByRole('button', { name: 'Rechercher' }).click();

    // Wait for results
    await page.waitForTimeout(2000);

    // Check if products are displayed (may vary based on API)
    const productCards = page.locator('[class*="group hover:shadow-lg"]');
    await expect(productCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display search suggestions', async ({ page }) => {
    await page.goto('/');

    // Check for suggestion buttons
    await expect(page.getByRole('button', { name: 'Nutella' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Coca Cola' })).toBeVisible();
  });

  test('should search via suggestion click', async ({ page }) => {
    await page.goto('/');

    // Click a suggestion
    await page.getByRole('button', { name: 'Nutella' }).click();

    // Wait for search to trigger
    await page.waitForTimeout(2000);

    // Verify search was triggered
    const searchInput = page.getByPlaceholder('Rechercher un produit...');
    await expect(searchInput).toHaveValue('Nutella');
  });
});
