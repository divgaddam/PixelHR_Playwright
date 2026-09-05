import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { CustomWorld } from '../hooks/world';
import { Loginpage } from '../pages/Loginpage';
import { getLoginPassword } from '../utils/encryption';

Given('I navigate to the Login page', async function (this: CustomWorld) {
    const loginpage = new Loginpage(this.page);
    await loginpage.gotoLogin();
});

When('login with user name and password', async function (this: CustomWorld) {
    const loginpage = new Loginpage(this.page);
    const username = process.env.PIXELHR_USERNAME;

    if (!username) {
        throw new Error('PIXELHR_USERNAME is missing. Add it to your .env file.');
    }

    const password = getLoginPassword();
    await loginpage.login(username, password);
});

Then(/click on SigfnIn|click on SignIn/i, async function (this: CustomWorld) {
    const loginpage = new Loginpage(this.page);
    await loginpage.clickLogin();
});

Then('I should be navigated to the home page', async function (this: CustomWorld) {
    const expectedUrl = 'https://ecs.memss.co.uk/Home/DefaultPage';

    await this.page.waitForURL(expectedUrl, { timeout: 30000 });
    const currentUrl = this.page.url();

    console.log('Current home page URL:', currentUrl);
    console.log('Expected home page URL:', expectedUrl);

    await expect(this.page).toHaveURL(expectedUrl);
    expect(currentUrl).toBe(expectedUrl);
});
