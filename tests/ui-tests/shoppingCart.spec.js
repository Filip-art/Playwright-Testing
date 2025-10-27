import { test, expect, describe, beforeEach } from '@playwright/test'
import { InventoryPage } from '../../pages/InventoryPage.js'
import { Cart } from '../../pages/cart.js'
import { CheckoutInfo } from '../../pages/checkoutInfo.js'


test.describe("Shopping cart working as expect", () => {
    beforeEach(async ({ page }) => {
        await page.goto("https://www.saucedemo.com/inventory.html")
    })

    const productName = "Sauce Labs Bike Light"

test("User can add an item to the cart", async ({ page }) => {
    const inventory = new InventoryPage(page)
    
    const addToCartBtn = inventory.getAddToCartButton(productName)
    console.log(addToCartBtn)
    await expect (addToCartBtn).toBeVisible()
    await addToCartBtn.click()
    await expect(inventory.shoppingCartBadge).toHaveText("1")

    await inventory.clickOnCart()
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
})

test("test the cart page", async({ page }) => {
    const inventory = new InventoryPage(page)
    const addToCartBtn = inventory.getAddToCartButton(productName)
    await addToCartBtn.click()
    await inventory.clickOnCart()
    
    const cart = new Cart(page)
    const cartTitle = cart.pageTitle
    await expect(cartTitle).toHaveText("Your Cart")
    const checkoutBtn = cart.checkoutBtn
    await expect(checkoutBtn).toBeVisible()

    const productInCart = cart.itemName
    await expect(productInCart).toHaveText(productName)

    const shoppingCartBadge = cart.shoppingCartBadge
    await expect(shoppingCartBadge).toHaveText("1")

    await cart.clickOnCheckout()
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
})

test("first checkout page", async({ page }) => {
    const inventory = new InventoryPage(page)
    const addToCartBtn = inventory.getAddToCartButton(productName)
    await addToCartBtn.click()
    await inventory.clickOnCart()
    const cart = new Cart(page)
    await cart.clickOnCheckout()

    const checkout = new CheckoutInfo(page)
    const checkoutTitleFirst = checkout.pageTitleFirst
    // console.log(page.url())
    await expect(checkoutTitleFirst).toHaveText("Checkout: Your Information")

    await checkout.fillUpForm()
    await checkout.clickOnContinue()
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")
})

test("checkout overview", async({ page }) => {
    const inventory = new InventoryPage(page)
    const addToCartBtn = inventory.getAddToCartButton(productName)
    await addToCartBtn.click()
    await inventory.clickOnCart()
    const cart = new Cart(page)
    await cart.clickOnCheckout()
    const checkout = new CheckoutInfo(page)

    await checkout.fillUpForm()
    await checkout.clickOnContinue()

    const checkoutTitleTwo = checkout.pageTitleSecond
    await expect(checkoutTitleTwo).toHaveText("Checkout: Overview")

    const paymentInfo = checkout.paymentInfo
    await expect(paymentInfo).toHaveText("Payment Information:")

    await checkout.clickOnFinish()
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
    await expect(page.getByTestId('complete-header')).toHaveText("Thank you for your order!")
})
})