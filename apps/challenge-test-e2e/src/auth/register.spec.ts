import { test, expect } from '@playwright/test';

const registerRoute = '/auth/register';

test('has title', async ({ page }) => {
  await page.goto(registerRoute);

  expect(await page.getByTestId('auth-title').innerText()).toContain(
    'Crear Cuenta'
  );
});

test('has toggle theme button', async ({ page }) => {
  await page.goto(registerRoute);

  expect(page.getByTestId('toggle-theme-btn')).toBeDefined();
});

test('has form', async ({ page }) => {
  await page.goto(registerRoute);

  [
    'register-form',
    'register-name-input',
    'register-email-input',
    'register-password-input',
  ].forEach((selector: string) => {
    expect(page.getByTestId(selector)).toBeDefined();
  });
});
