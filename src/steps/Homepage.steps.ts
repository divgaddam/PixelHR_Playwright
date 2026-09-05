import { Given, Then, When } from '@cucumber/cucumber';

import { CustomWorld } from '../hooks/world';
import { Homepage } from '../pages/Homepage';
import { Loginpage } from '../pages/Loginpage';
import { getLoginPassword } from '../utils/encryption';

Given('I am logged in to the home page', async function (this: CustomWorld) {
    const loginPage = new Loginpage(this.page);
    await loginPage.gotoLogin();

    const username = process.env.PIXELHR_USERNAME;
    if (!username) {
        throw new Error('PIXELHR_USERNAME is missing. Add it to your .env file.');
    }

    const password = getLoginPassword();
    await loginPage.login(username, password);
    await loginPage.clickLogin();

    await this.page.waitForURL('https://ecs.memss.co.uk/Home/DefaultPage', { timeout: 30000 });
});

When('I click on KalTech', async function (this: CustomWorld) {
    const homePage = new Homepage(this.page);
    await homePage.clickKalTech();
});

Then('the popup should be closed', async function (this: CustomWorld) {
    const homePage = new Homepage(this.page);
    await homePage.verifyPopupClosed();
});

Then('I should see the company name {string} on the homepage', async function (this: CustomWorld, companyName: string) {
    const homePage = new Homepage(this.page);
    await homePage.verifyCompanyName(companyName);
});

Then('I should be on the KalTech page', async function (this: CustomWorld) {
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    console.log('KalTech page URL:', currentUrl);
});
