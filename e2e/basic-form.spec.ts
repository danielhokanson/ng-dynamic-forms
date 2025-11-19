import { test, expect } from '@playwright/test';

test.describe('NG Dynamic Forms - Basic Form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/#/basic-sample-form');
    });

    test('should display the form', async ({ page }) => {
        // Check that form elements are rendered
        await expect(page.locator('form')).toBeVisible();
    });

    test('should have form controls', async ({ page }) => {
        // Wait for form to be fully loaded
        await page.waitForSelector('form', { timeout: 10000 });

        // Check for common form elements
        const formControls = page.locator('form input, form select, form textarea');
        await expect(formControls.first()).toBeVisible();
    });

    test('should allow form interaction', async ({ page }) => {
        // Wait for form
        await page.waitForSelector('form', { timeout: 10000 });

        // Try to interact with first input if available
        const firstInput = page.locator('form input[type="text"]').first();
        if (await firstInput.count() > 0) {
            await firstInput.fill('Test Value');
            await expect(firstInput).toHaveValue('Test Value');
        }
    });
});
