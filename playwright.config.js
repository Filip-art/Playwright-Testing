import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({

  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. */
  reporter: [
    ["list"],
    ["html", { open: "never"}] 
  ],
  
  use: {
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    testIdAttribute: 'data-test'
  },

  /* ------------ KONFIGURACE PROJEKTŮ ------------ */
  projects: [


    {
      name: 'setup-saucedemo',
      testMatch: /setup\/auth\.setup\.js/, 
    },
    {
      name: 'setup-demoqa',
      testMatch: /setup\/demoqa-auth\.setup\.js/,
    },

    /* ======== 2. UI TESTY  ======== */
    {
      name: 'chromium-ui-saucedemo',
      testMatch: [/tests\/ui-tests\/(loginPage|shoppingCart)\.spec\.js/, /playground\/.*\.spec\.js/], 
      dependencies: ['setup-saucedemo'], 
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json', 
      },
    },
    {
      name: 'chromium-ui-demoqa',
      testMatch: /tests\/ui-tests\/demoqa-profile\.spec\.js/,
      dependencies: ['setup-demoqa'], 
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/demoqa-user.json', 
      },
    },
    
    /* ======== 3. API TESTY ======== */
    {
      name: 'chromium-api',
      testMatch: /tests\/API-testing\/.*\.api\.spec\.js/,
      use: { 
        baseURL: 'https://jsonplaceholder.typicode.com'
      },
    },

    
    // {
    //   name: 'firefox-ui-saucedemo',
    //   testMatch: [/tests\/ui-tests\/(loginPage|shoppingCart)\.spec\.js/, /playground\/.*\.spec\.js/],
    //   dependencies: ['setup-saucedemo'],
    //   use: { 
    //     ...devices['Desktop Firefox'], 
    //     storageState: 'playwright/.auth/user.json',
    //   },
    // },
    // {
    //   name: 'firefox-ui-demoqa',
    //   testMatch: /tests\/ui-tests\/demoqa-profile\.spec\.js/,
    //   dependencies: ['setup-demoqa'],
    //   use: { 
    //     ...devices['Desktop Firefox'], 
    //     storageState: 'playwright/.auth/demoqa-user.json',
    //   },
    // },
    
  ],
});