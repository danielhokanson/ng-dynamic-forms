import { test, expect } from '@playwright/test';

const SAMPLE_ROUTES = [
    { path: 'basic-sample-form', title: 'Basic UI' },
    { path: 'bootstrap-sample-form', title: 'Bootstrap UI' },
    { path: 'ngx-bootstrap-sample-form', title: 'ngx-bootstrap UI' },
    { path: 'foundation-sample-form', title: 'Foundation UI' },
    { path: 'material-sample-form', title: 'Material UI' },
    { path: 'ng-bootstrap-sample-form', title: 'NG Bootstrap UI' },
    { path: 'primeng-sample-form', title: 'Prime NG UI' },
    { path: 'lazy-loaded-form', title: 'Lazy Loaded' }
];

test.describe('NG Dynamic Forms - all sample forms render', () => {
    for (const route of SAMPLE_ROUTES) {
        test(`${route.path} renders a form with controls`, async ({ page }) => {
            await page.goto(`/#/${route.path}`);
            await page.waitForSelector('form', { timeout: 10000 });

            const formControls = page.locator('form input, form select, form textarea');
            await expect(formControls.first()).toBeVisible();
        });
    }
});
