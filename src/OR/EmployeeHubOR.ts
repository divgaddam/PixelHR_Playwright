import { Locator, Page } from '@playwright/test';

export class EmployeeHubOR {
    readonly employeeHubLink: Locator;
    readonly manageEmployeesLink: Locator;
    readonly addEmployeesLink: Locator;
    readonly foreNamesInput: Locator;

    constructor(protected readonly page: Page) {
        this.employeeHubLink = page.locator('#navbar-nav > div.simplebar-wrapper > div.simplebar-mask > div > div > div > li:nth-child(2) > a > span');
        this.manageEmployeesLink = page.locator('#EmployeeDocumentMenu > ul > li:nth-child(1) > a');
        this.addEmployeesLink = page.locator('#layout-wrapper > div.main-content > div.page-content > main > div.employee-directory.px-2 > section.employee-directory__hero > div.employee-directory__actions > button:nth-child(1)');
        this.foreNamesInput = page.locator("#ForeNames");
        }
}
