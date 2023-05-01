import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/quotes");
});

test("should have correct title", async ({ page }) => {
  await expect(page.locator("#quotes-title")).toContainText("Movie Quotes");
});

test("should be able to navigate to movies", async ({ page }) => {
  await page.click("#movies-nav-link");
  await expect(page).toHaveURL("/");
});
