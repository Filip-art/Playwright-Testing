export class Cart{
    constructor (page) {
        this.page = page
        this.pageTitle = page.getByTestId("title")
        this.itemName = page.getByTestId("inventory-item-name")
        this.checkoutBtn = page.getByTestId("checkout")
        this.shoppingCartBadge = page.getByTestId("shopping-cart-badge")
    }

    async clickOnCheckout() {
        await this.checkoutBtn.click()
    }
}