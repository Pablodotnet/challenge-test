import { test, expect } from '@playwright/test';

const loginRoute = '/auth/login';
const testAccount = 'cuentaprueba@test.com';
const testPassword = 'test123';

test('has title', async ({ page }) => {
  await page.goto(loginRoute);

  expect(await page.getByTestId('auth-title').innerText()).toContain('Login');
});

test('has toggle theme button', async ({ page }) => {
  await page.goto(loginRoute);

  expect(page.getByTestId('toggle-theme-btn')).toBeDefined();
});

test('has form', async ({ page }) => {
  await page.goto(loginRoute);

  ['login-form', 'login-email-input', 'login-password-input'].forEach(
    (selector: string) => {
      expect(page.getByTestId(selector)).toBeDefined();
    }
  );
});

test('has login and google account buttons', async ({ page }) => {
  await page.goto(loginRoute);

  expect(page.getByTestId('login-button')).toBeDefined();
  expect(page.getByTestId('google-button')).toBeDefined();
});

test('has create account buttons', async ({ page }) => {
  await page.goto(loginRoute);

  expect(page.getByTestId('create-account-btn')).toBeDefined();
  await expect(page.getByTestId('create-account-btn')).toHaveText('Crear cuenta');
});

test('login with valid credentials redirects to dashboard', async ({ page }) => {
  await page.goto(loginRoute);

  await page
    .getByTestId('login-email-input')
    .locator('input')
    .fill(testAccount);

  await page.getByTestId('login-password-input').locator('input').fill(testPassword);

  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('app-dashboard-title')).toBeDefined();
  await expect(page.getByTestId('app-dashboard-title')).toHaveText(
    'Challenge Test App'
  );
});

