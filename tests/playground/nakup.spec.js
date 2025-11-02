import { test, expect, describe, beforeEach } from '@playwright/test'
import { InventoryPage } from '../../pages/inventoryPage.js'

const itemFromShop = "Sauce Labs Backpack"

test.describe("Funkcionalita nákupního košíku", () => {
    beforeEach(async ({ page }) => {
        await page.goto("https://www.saucedemo.com/inventory.html")
    })

    test("uživatel by měl být schopen přidat položky do košíku", async({ page }) => {
        const inventoryPage = new InventoryPage(page)
        await expect (inventoryPage.pageTitle).toBeVisible()

        const addToCartBtn = inventoryPage.getAddToCartButton(itemFromShop)
        await expect (addToCartBtn).toBeVisible()

        await addToCartBtn.click()
        await expect (inventoryPage.shoppingCartBadge).toHaveText("1")

        const removeBtn = inventoryPage.getRemoveButton(itemFromShop)
        await expect(removeBtn).toBeVisible()
    })

    test("uživatel by měl být schopen odebrat položku z košíku", async({ page }) => {
        const inventoryPage = new InventoryPage(page)
        const addToCartBtn = inventoryPage.getAddToCartButton(itemFromShop)
        const removeBtn = inventoryPage.getRemoveButton(itemFromShop)
            
        await addToCartBtn.click()
        await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
        await removeBtn.click()

        await expect(removeBtn).not.toBeVisible()
        await expect(addToCartBtn).toHaveText("Add to cart")
        await expect(inventoryPage.shoppingCartBadge).not.toBeVisible()

    })
})