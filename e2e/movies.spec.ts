import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("should have correct title", async ({ page }) => {
  await expect(page.locator("#movies-title")).toContainText("Movies");
});

test("should be able to navigate to characters", async ({ page }) => {
  await page.click("#characters-nav-link");
  await expect(page).toHaveURL("/characters");
});
