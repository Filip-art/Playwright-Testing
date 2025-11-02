import { test, expect } from '@playwright/test'

test("měl by být přihlášený a vidět profil", async({ page }) => {
    await page.goto("https://demoqa.com/profile")

    const logoutBtn = page.getByRole('button', { name: 'Log out' })

    await expect(logoutBtn).toBeVisible()

    const expectedUserName = await page.context().cookies()

    const userNameCookie = expectedUserName.find( (cookie) => {
        return cookie.name === 'userName'
    })

    let userNameValue;

    if (userNameCookie) {
        userNameValue = userNameCookie.value;
    } else {
        userNameValue = null; 
    }

    console.log(userNameValue)

    const user = page.locator("#userName-value")

    await expect(user).toHaveText(userNameValue)

})