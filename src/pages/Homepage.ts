import { expect } from '@playwright/test';

import { HomepageOR } from '../OR/HomepageOR';

export class Homepage extends HomepageOR {
    async verifyCompanyName(expectedText: string): Promise<void> {
        await this.companyNameHeading.waitFor({ state: 'visible', timeout: 30000 });
        await expect(this.companyNameHeading).toContainText(expectedText);
        console.log(`Verified homepage company name: ${expectedText}`);
    }

    async verifyPopupClosed(): Promise<void> {
        const popup = this.page.locator('#BookDemomodel');
        await expect(popup).toBeHidden({ timeout: 30000 });
        console.log('Verified: KalTech popup is closed');
    }

    async closePopupIfVisible(): Promise<boolean> {
        const popup = this.page.locator('#BookDemomodel');
        const popupCloseButton = this.page.locator('#BookDemomodel > div > div > div > button').first();

        const isPopupVisible = await popup.isVisible().catch(() => false);
        if (!isPopupVisible) {
            return false;
        }

        await popupCloseButton.waitFor({ state: 'visible', timeout: 30000 }).catch(() => undefined);
        await popupCloseButton.click().catch(() => this.page.keyboard.press('Escape'));
        await this.page.waitForTimeout(1500);
        await expect(popup).toBeHidden({ timeout: 30000 });
        console.log('Handled: KalTech popup closed');
        return true;
    }

    async clickKalTech(): Promise<void> {
        await this.kalTechLink.waitFor({ state: 'visible', timeout: 30000 });
        await this.kalTechLink.click();
        await this.closePopupIfVisible();
    }
}
