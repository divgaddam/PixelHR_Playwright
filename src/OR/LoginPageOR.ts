import { Locator, Page } from "@playwright/test";

export class LoginpageOR {
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(protected readonly page: Page) {
        this.userName = page.locator('#username');
        this.password = page.locator('#password-input');
        this.loginButton = page.locator('#Login-submit');
    }
}
