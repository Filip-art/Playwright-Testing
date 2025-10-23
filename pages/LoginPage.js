export class LoginPage {
    constructor(page) {
        this.page = page
        this.usernameInput = page.getByTestId("username")
        this.passwordInput = page.getByTestId("password")
        this.loginButton = page.getByTestId("login-button")
        this.loginErrMsg = page.getByTestId("error")
        this.errorMsgBtn = page.getByTestId("error-button")
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/')
    }

    async login(username, password) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
}