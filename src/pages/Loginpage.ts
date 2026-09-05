import { LoginpageOR } from '../OR/LoginPageOR';
import { baseUrl } from '../../config/profiles/utilities.json';

export class Loginpage extends LoginpageOR {
    async gotoLogin(): Promise<void> {
        const appUrl = baseUrl;
        if (!appUrl) {
            throw new Error('Application URL is not configured. Set baseUrl in config/profiles/.json');
        }
        await this.page.context().clearCookies();
        await this.page.goto(appUrl);
    }

    async login(username: string, password: string): Promise<void> {
        await this.userName.waitFor({ state: 'visible', timeout: 15000 });
        await this.userName.fill(username);
        await this.password.fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.loginButton.click();
    }
}
