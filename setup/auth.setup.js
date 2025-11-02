import { test as setup, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginpage.js'

const authFile = 'playwright/.auth/user.json';

setup("authenticate", async ({ page }) => {
    const userLogin = new LoginPage(page)

    await userLogin.goto()
    await userLogin.login("standard_user", "secret_sauce")

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    await page.context().storageState({ path: authFile })
})