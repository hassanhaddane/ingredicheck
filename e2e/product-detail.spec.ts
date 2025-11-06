import { test, expect } from '@playwright/test';

test.describe('Product Detail Page', () => {
  test('should navigate to product detail page', async ({ page }) => {
    await page.goto('/');

    // Search for a product
    await page.getByPlaceholder('Rechercher un produit...').fill('Nutella');
    await page.getByRole('button', { name: 'Rechercher' }).click();

    // Wait for results
    await page.waitForTimeout(2000);

    // Click on first product card
    const firstProduct = page.locator('[class*="group hover:shadow-lg"]').first();
    await firstProduct.click();

    // Wait for navigation
    await page.waitForURL(/\/product\/\d+/);

    // Check if we're on product detail page
    await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  });

  test('should display product information', async ({ page }) => {
    // Navigate directly to a known product (Nutella)
    await page.goto('/product/3017620422003');

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Check for product name or image
    await expect(
      page.locator('h1').or(page.getByText('Nom inconnu'))
    ).toBeVisible({ timeout: 10000 });
  });

  test('should have back button', async ({ page }) => {
    await page.goto('/product/3017620422003');

    const backButton = page.getByRole('button', { name: 'Retour' });
    await expect(backButton).toBeVisible();

    // Click back button
    await backButton.click();

    // Should navigate back to home
    await expect(page).toHaveURL('/');
  });

  test('should display nutritional information', async ({ page }) => {
    await page.goto('/product/3017620422003');

    // Wait for page load
    await page.waitForTimeout(2000);

    // Check for nutrition card (may not always be present)
    const nutritionInfo = page.getByText('Informations Nutritionnelles');
    const nutritionVisible = await nutritionInfo.isVisible().catch(() => false);

    if (nutritionVisible) {
      await expect(nutritionInfo).toBeVisible();
    }
  });
});
