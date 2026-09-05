import { expect } from '@playwright/test';

import { EmployeeHubOR } from '../OR/EmployeeHubOR';
import { Homepage } from './Homepage';

export class EmployeeHub extends EmployeeHubOR {
    async openEmployeeHub(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        const homePage = new Homepage(this.page);
        await homePage.closePopupIfVisible();

        await this.employeeHubLink.waitFor({ state: 'visible', timeout: 30000 });
        await this.employeeHubLink.click();
        await expect(this.employeeHubLink).toBeVisible({ timeout: 30000 });
    }

    async openManageEmployees(): Promise<void> {
        const homePage = new Homepage(this.page);
        await homePage.closePopupIfVisible();

        await this.manageEmployeesLink.waitFor({ state: 'visible', timeout: 30000 });
        await this.manageEmployeesLink.click();
        await expect(this.manageEmployeesLink).toBeVisible({ timeout: 30000 });
    }

    async openAddEmployees(): Promise<void> {
        const homePage = new Homepage(this.page);
        await homePage.closePopupIfVisible();

        await this.addEmployeesLink.waitFor({ state: 'visible', timeout: 30000 });
        await this.addEmployeesLink.click();
        await expect(this.addEmployeesLink).toBeVisible({ timeout: 30000 });
    }

    async typeForeNames(value: string): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        const input = this.foreNamesInput;

        await input.waitFor({ state: 'visible', timeout: 30000 }).catch(async () => {
            const fallback = this.page.locator('input#ForeNames, input[id*="ForeNames" i], input[name*="ForeNames" i]').first();
            await fallback.waitFor({ state: 'visible', timeout: 30000 });
        });

        await input.click();
        await input.fill('');
        await input.pressSequentially(value, { delay: 150 });

        await input.waitFor({ state: 'visible', timeout: 30000 });
        const enteredValue = await input.inputValue();
        if (enteredValue !== value) {
            throw new Error(`Expected #ForeNames to contain '${value}', but it contains '${enteredValue}' instead.`);
        }
    }
}
