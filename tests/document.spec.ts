import { test, expect } from "@playwright/test";
import { BaseURL } from "../src/constants/app";

const websiteUrl = `http://localhost:4173${BaseURL}`;

test("Has a 'home' title", async ({ page }) => {
  // go to home page
  await page.goto(websiteUrl);

  // expect a title to have a 'home' substring
  await expect(page).toHaveTitle(/.*home/);
});

test("Has an 'anime' title", async ({ page }) => {
  // go to anime page
  await page.goto(websiteUrl + "/anime");

  // expect a title to have an 'anime' substring
  await expect(page).toHaveTitle(/.*anime/);
});
