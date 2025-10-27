import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/loginPage.js';

test.describe("Přihlášení do Swag Labs", () => {

    test("Login is successful", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()

        await loginPage.login("standard_user", "secret_sauce")
        
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    });

    test("Login is unsuccessful", async({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()

        await loginPage.login("XXX", "YYY")

        await expect (loginPage.loginErrMsg).toBeVisible()

        await expect (loginPage.loginErrMsg).toHaveText("Epic sadface: Username and password do not match any user in this service")
        await loginPage.errorMsgBtn.click()
        await expect (loginPage.loginErrMsg).not.toBeVisible()

    })
})

