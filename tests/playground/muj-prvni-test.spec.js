import { test, expect } from '@playwright/test'

test("ověření titulku na seznam.cz", async ( { page }) => {
    await page.goto("https://www.seznam.cz")
    await expect(page).toHaveTitle(/Seznam – najdu tam, co neznám/)
})