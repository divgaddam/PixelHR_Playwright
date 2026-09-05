import { Locator, Page } from '@playwright/test';

export class HomepageOR {
    readonly kalTechLink: Locator;
    readonly companyNameHeading: Locator;

    constructor(protected readonly page: Page) {
        this.kalTechLink = page.locator('#form-7197 > div > div.text-primary.clip1');
        this.companyNameHeading = page.locator('#page-topbar > div > div > div:nth-child(1) > div.d-flex.justify-content-center > div > h1');
    }
}
