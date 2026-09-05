import "dotenv/config";

import {
    After,
    Before,
    setDefaultTimeout,
} from "@cucumber/cucumber";

import { chromium } from "@playwright/test";
import { CustomWorld } from "./world";

const timeoutMs = 60_000;

setDefaultTimeout(timeoutMs);

Before(async function (this: CustomWorld): Promise<void> {
    this.browser = await chromium.launch({
        channel: "chrome",
        headless: false,
    });

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld): Promise<void> {
    await this.attach(
        await this.page.screenshot({ fullPage: true }),
        "image/png"
    );

    await this.context?.close();
    await this.browser?.close();
});
