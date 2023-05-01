import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/characters");
});

test("should have correct title", async ({ page }) => {
  await expect(page.locator("#characters-title")).toContainText(
    "Movie Characters"
  );
});

test("should be able to navigate to quotes", async ({ page }) => {
  await page.click("#quotes-nav-link");
  await expect(page).toHaveURL("/quotes");
});
