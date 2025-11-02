import { test as authentication, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage.js'

authentication("Retrieve a cookie", async ({ page }) => {
    const userLogin = new LoginPage(page)

    userLogin.goto()
    userLogin.login("standard_user", "secret_sauce")

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    await page.context().storageState({ 
        path: 'playwright/authentication/user.json' 
    })
})