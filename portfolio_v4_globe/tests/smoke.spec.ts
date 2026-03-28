import { test, expect } from '@playwright/test'

test('home page loads with title and globe section', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('HAK.')
  await expect(page.locator('canvas')).toBeVisible()
  await expect(page.locator('text=About Me')).toBeVisible()
  await expect(page.locator('text=Featured')).toBeVisible()
})

test('research page loads with paper list', async ({ page }) => {
  await page.goto('/research')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('article')).toHaveCount(3)
})

test('web projects page loads with project cards', async ({ page }) => {
  await page.goto('/web')
  await expect(page.locator('h1')).toContainText('Web')
  await expect(page.locator('[data-testid="project-card"]').first()).toBeVisible()
})

test('mobile projects page loads with project cards', async ({ page }) => {
  await page.goto('/mobile')
  await expect(page.locator('h1')).toContainText('Mobile')
  await expect(page.locator('[data-testid="project-card"]').first()).toBeVisible()
})

test('cv page loads with timeline entries', async ({ page }) => {
  await page.goto('/cv')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('[data-testid="cv-entry"]').first()).toBeVisible()
})

test('nav links navigate correctly', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Research')
  await expect(page).toHaveURL('/research')
  await page.click('text=Web')
  await expect(page).toHaveURL('/web')
  await page.click('text=Mobile')
  await expect(page).toHaveURL('/mobile')
  await page.click('text=CV')
  await expect(page).toHaveURL('/cv')
})
