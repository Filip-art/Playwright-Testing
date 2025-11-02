export class InventoryPage {
    constructor(page) {
        this.page = page
        this.pageTitle = page.getByTestId("title")
        this.shoppingCartBadge = page.getByTestId("shopping-cart-badge")
    }

    getAddToCartButton(productName) {
        const productId = productName.toLowerCase().replace(/ /g, '-')
        const finalProductName = "add-to-cart-" + productId
        // await this.page.getByTestId(finalProductName).click()
        return this.page.getByTestId(finalProductName) 
    } 

    getRemoveButton(productName) {
        const productId = productName.toLowerCase().replace(/ /g, '-')
        const finalProductName = "remove-" + productId
        return this.page.getByTestId(finalProductName)
    }

    async clickOnCart() {
        await this.page.getByTestId("shopping-cart-link").click()
    }

}