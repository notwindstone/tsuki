import { defineConfig, devices } from "@playwright/test";
import { BaseURL } from "./src/constants/app";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  "testDir": "./tests",

  /* Run tests in files in parallel */
  "fullyParallel": true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  "forbidOnly": !!process.env.CI,

  /* Retry on CI only */
  "retries": process.env.CI ? 2 : 0,

  /* Tests timeout */
  "timeout": 5 * 1000,

  /* Opt out of parallel tests on CI. */
  "workers": process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  "reporter": "html",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  "use": {

    /* Base URL to use in actions like `await page.goto('/')`. */
    "baseURL": `http://localhost:4173${BaseURL}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    "trace": "on-first-retry",
  },

  /* Configure projects for major browsers */
  "projects": [
    {
      "name": "Desktop Chromium",
      "use" : { ...devices["Desktop Chrome"] },

    },

    {
      "name": "Desktop Firefox",
      "use" : { ...devices["Desktop Firefox"] },
    },

    {
      "name": "Desktop Safari",
      "use" : { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    {
      "name": "Mobile Chrome",
      "use" : { ...devices["Pixel 5"] },
    },
    {
      "name": "Mobile Safari",
      "use" : { ...devices["iPhone 12"] },
    },
  ],

  /* Run your local server before starting the tests */
  "webServer": {
    "command"            : "bun run build && bun preview",
    "url"                : "http://localhost:4173",
    "reuseExistingServer": !process.env.CI,
  },
});
