import { test, expect } from "@playwright/test";
import { BaseURL } from "../src/constants/app";
import { Routes } from "../src/constants/routes";

const websiteUrl = `http://localhost:4173${BaseURL}`;
const RouteEntries = Object
  .entries(Routes);

// check every defined page to have a specific title
for (const [RouteName, RoutePath] of RouteEntries) {
  const testName = `Has: '${RouteName}' title`;
  const pageTitleRegex = new RegExp(`.*${RouteName.toLowerCase()}`);

  test(testName, async ({ page }) => {
    // go to home page
    await page.goto(websiteUrl + RoutePath);

    // expect a title to have a 'home' substring
    await expect(page).toHaveTitle(pageTitleRegex);
  });
}
