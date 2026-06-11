import { test, expect } from '@playwright/test';

// TC-P0-01: Home EN carga con contenido correcto
test('P0-01: home EN loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Bugs in production.')).toBeVisible();
  await expect(page.getByText('No senior team.')).toBeVisible();
  await expect(page.getByText('Schedule discovery session')).toBeVisible();
  await expect(page.getByText('See solutions')).toBeVisible();
});

// TC-P0-02: Home ES carga con contenido en español
test('P0-02: home ES loads', async ({ page }) => {
  await page.goto('/es/');
  await expect(page.getByText('Bugs en producción.')).toBeVisible();
  await expect(page.getByText('Sin equipo senior.')).toBeVisible();
  await expect(page.getByTestId('hero-cta-primary')).toContainText('Agendar sesión de descubrimiento');
  await expect(page.getByTestId('hero-cta-secondary')).toContainText('Ver soluciones');
});

// TC-P0-03: Switch de idioma EN → ES
test('P0-03: lang switch EN → ES', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Bugs in production.')).toBeVisible();

  await page.getByTestId('lang-switch').click();
  await page.waitForURL('**/es/**');

  await expect(page.getByText('Bugs en producción.')).toBeVisible();
  await expect(page.getByTestId('hero-cta-primary')).toContainText('Agendar sesión de descubrimiento');
  await expect(page.getByText('Bugs in production.')).not.toBeVisible();
});

// TC-P0-04: Switch de idioma ES → EN
test('P0-04: lang switch ES → EN', async ({ page }) => {
  await page.goto('/es/');
  await expect(page.getByText('Bugs en producción.')).toBeVisible();

  await page.getByTestId('lang-switch').click();
  await page.waitForURL(url => !url.pathname.startsWith('/es'));

  await expect(page.getByText('Bugs in production.')).toBeVisible();
  await expect(page.getByText('Schedule discovery session')).toBeVisible();
  await expect(page.getByText('Bugs en producción.')).not.toBeVisible();
});

// TC-P0-05: CTA del hero lleva al formulario de contacto
test('P0-05: hero CTA scrolls to contact form', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('hero-cta-primary').click();

  await expect(page.getByTestId('contact-form')).toBeVisible();
  await expect(page.getByTestId('ct-name')).toBeVisible();
  await expect(page.getByTestId('ct-email')).toBeVisible();
  await expect(page.getByTestId('contact-submit')).toBeVisible();
});

// TC-P0-06: Todas las secciones principales están presentes
test('P0-06: all sections present', async ({ page }) => {
  await page.goto('/');

  // Scroll a cada sección y verificar que existe en el DOM
  for (const sectionId of ['about', 'entry', 'enterprise', 'why-us', 'leadership', 'contact']) {
    await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${sectionId}`)).toBeVisible();
  }

  // Footer
  await page.getByTestId('site-footer').scrollIntoViewIfNeeded();
  await expect(page.getByText('Building something different, together.')).toBeVisible();
});
