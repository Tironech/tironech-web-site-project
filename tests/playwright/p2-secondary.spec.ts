import { test, expect } from '@playwright/test';

// TC-P2-01: Campos del formulario presentes y correctos (EN)
test('P2-01: contact form fields EN', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('contact-form').scrollIntoViewIfNeeded();

  await expect(page.getByLabel('Full name *')).toBeVisible();
  await expect(page.getByLabel('Company *')).toBeVisible();
  await expect(page.getByLabel('Corporate email *')).toBeVisible();
  await expect(page.getByLabel('Country / Market')).toBeVisible();
  await expect(page.getByLabel('Which solution interests you? *')).toBeVisible();
  await expect(page.getByLabel('Describe your current technical problem *')).toBeVisible();
  await expect(page.getByTestId('contact-submit')).toBeVisible();
  await expect(page.getByTestId('ct-service')).toBeVisible();

  // Llenar y tomar screenshot visual
  await page.getByTestId('ct-name').fill('John Smith');
  await page.getByTestId('ct-company').fill('StartupXYZ');
  await page.getByTestId('ct-email').fill('john@startupxyz.com');
  await page.getByTestId('ct-market').fill('USA');
  await page.screenshot({ path: 'test-results/form-en-filled.png', fullPage: false });

  await page.getByTestId('ct-service').selectOption('qa');
  await page.getByTestId('ct-problem').fill('We have frequent production bugs and our manual QA does not scale.');
  await page.screenshot({ path: 'test-results/form-en-complete.png', fullPage: false });
});

// TC-P2-02: Campos del formulario presentes y correctos (ES)
test('P2-02: contact form fields ES', async ({ page }) => {
  await page.goto('/es/');
  await page.getByTestId('contact-form').scrollIntoViewIfNeeded();

  await expect(page.getByLabel('Nombre completo *')).toBeVisible();
  await expect(page.getByLabel('Empresa *')).toBeVisible();
  await expect(page.getByLabel('Email corporativo *')).toBeVisible();
  await expect(page.getByTestId('contact-submit')).toContainText('Agendar Sesión de Descubrimiento Gratuita');
  await expect(page.getByTestId('ct-service')).toBeVisible();

  // Screenshot visual del formulario en español
  await page.getByTestId('ct-name').fill('Juan García');
  await page.getByTestId('ct-company').fill('StartupXYZ');
  await page.getByTestId('ct-email').fill('juan@startupxyz.com');
  await page.screenshot({ path: 'test-results/form-es-filled.png', fullPage: false });
});

// TC-P2-03: Links del footer presentes (EN)
test('P2-03: footer links EN', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('site-footer').scrollIntoViewIfNeeded();

  const footer = page.getByTestId('site-footer');
  await expect(footer.getByRole('link', { name: 'About us' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Why Tironech' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Team', exact: true })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Contact' })).toBeVisible();
  await expect(page.getByTestId('footer-privacy')).toBeVisible();
  await expect(page.getByText('Building something different, together.')).toBeVisible();
});

// TC-P2-04: Página 404 carga para rutas inexistentes
test('P2-04: 404 page', async ({ page }) => {
  const response = await page.goto('/esta-ruta-no-existe');
  expect(response?.status()).toBe(404);

  await expect(page.getByText('ERROR 404')).toBeVisible();
  await expect(page.getByText('Page not found.')).toBeVisible();
  await expect(page.getByText('Página no encontrada.')).toBeVisible();
  await expect(page.getByRole('link', { name: '← Back to home' })).toBeVisible();
});

// TC-P2-05: Página de privacidad EN carga
test('P2-05: privacy page EN', async ({ page }) => {
  const response = await page.goto('/privacy');
  expect(response?.status()).toBe(200);
  await expect(page.getByText('ERROR 404')).not.toBeVisible();
});

// TC-P2-06: Página de privacidad ES carga
test('P2-06: privacy page ES', async ({ page }) => {
  const response = await page.goto('/es/privacy');
  expect(response?.status()).toBe(200);
  await expect(page.getByText('ERROR 404')).not.toBeVisible();
});
