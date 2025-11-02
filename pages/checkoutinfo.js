export class CheckoutInfo{
    constructor(page) {
        this.page = page
        this.pageTitleFirst = page.getByTestId("title")
        this.pageTitleSecond = page.getByTestId("title")
        this.form = page.locator(".checkout_info")
        this.firstName = page.getByTestId("firstName")
        this.lastName = page.getByTestId("lastName")
        this.zipCode = page.getByTestId("postalCode")
        this.continueBtn = page.getByTestId("continue")
        this.paymentInfo = page.getByTestId("payment-info-label")
        this.finishBtn = page.getByTestId("finish")
    }

    async fillUpForm() {
        await this.firstName.fill("First Name")
        await this.lastName.fill("Last Name")
        await this.zipCode.fill("12038")
    }

    async clickOnContinue() {
        await this.continueBtn.click()
    }

    async clickOnFinish() {
        await this.finishBtn.click()
    }
}