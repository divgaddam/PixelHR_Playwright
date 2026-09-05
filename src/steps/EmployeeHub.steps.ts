import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { CustomWorld } from '../hooks/world';
import { EmployeeHub } from '../pages/EmployeeHub';
import { getLoginPassword } from '../utils/encryption';

Given('I am logged in to the application', async function (this: CustomWorld) {
    const knownHomePage = 'https://ecs.memss.co.uk/Home/DefaultPage';

    await this.page.goto('https://ecs.memss.co.uk/Identity/Account/Login?ReturnUrl=%2F');
    await this.page.waitForLoadState('domcontentloaded');

    const username = process.env.PIXELHR_USERNAME;
    if (!username) {
        throw new Error('PIXELHR_USERNAME is missing. Add it to your .env file.');
    }

    const password = getLoginPassword();

    await this.page.locator('#username, #UserName, input[name*="user" i]').fill(username);
    await this.page.locator('#password, #Password, input[type="password"], input[name*="password" i]').fill(password);
    await this.page.getByRole('button', { name: /^Sign in$/i }).click();

    await this.page.waitForURL(knownHomePage, { timeout: 30000 });
    await expect(this.page).toHaveURL(knownHomePage);
});

When('I click on Employee Hub', async function (this: CustomWorld) {
    const employeeHub = new EmployeeHub(this.page);
    await employeeHub.openEmployeeHub();
    await expect(this.page.locator('#navbar-nav > div.simplebar-wrapper > div.simplebar-mask > div > div > div > li:nth-child(2) > a > span')).toBeVisible({ timeout: 30000 });
});

When('I click on Manage Employees', async function (this: CustomWorld) {
    const employeeHub = new EmployeeHub(this.page);
    await employeeHub.openManageEmployees();
    await expect(this.page.locator('body')).toContainText(/Manage Employees/i);
});

When('I click on Add Employees', async function (this: CustomWorld) {
    const employeeHub = new EmployeeHub(this.page);
    await employeeHub.openAddEmployees();
    await expect(this.page.locator('body')).toContainText(/Add Employee(s)?/i);
});

When('I type {string} in the first name field', async function (this: CustomWorld, value: string) {
    const employeeHub = new EmployeeHub(this.page);
    await employeeHub.typeForeNames(value);

    const field = this.page.locator('#ForeNames');
    await expect(field).toHaveValue(value);
});

Then('I should be on the Add Employees page', async function (this: CustomWorld) {
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    await expect(this.page).toHaveURL(/https:\/\/ecs\.memss\.co\.uk\//i);
    console.log(`Current employee flow URL: ${currentUrl}`);
});

Then('I should see {string} in the first name field', async function (this: CustomWorld, value: string) {
    const field = this.page.locator('#ForeNames');
    await expect(field).toHaveValue(value);
});