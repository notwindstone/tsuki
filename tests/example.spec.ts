import { test, expect } from "@playwright/test";
import { BaseURL } from "../src/constants/app";

const websiteUrl = `http://localhost:4173${BaseURL}`;

test.beforeEach(async ({ page }) => {
  await page.goto(websiteUrl);
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  // Click the get started link.
  await page.getByRole("link", { "name": "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { "name": "Installation" })).toBeVisible();
});
