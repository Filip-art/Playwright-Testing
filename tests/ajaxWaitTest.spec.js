import { test, expect } from '@playwright/test'

test.describe("Testování dlouhého requestu na server", () => {

    test("Po kliknutí na tlačítko se má zobrazit text", async ({ page }) => {
        
        await page.goto("http://uitestingplayground.com/ajax")

        await page.locator("#ajaxButton").click()
        // await page.getByRole("button", { name: 'Button Triggering AJAX Request'}).click()

        await expect (page.getByText('Data loaded with AJAX get request.')).toBeVisible({ timeout: 16000})

    })

})