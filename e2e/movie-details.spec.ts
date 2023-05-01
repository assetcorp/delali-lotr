import { test, expect } from "@playwright/test";

test("should load the correct movie details", async ({ page }) => {
  await page.goto("/movies/5cd95395de30eff6ebccde56");
  await expect(page.locator("#movies-details-title")).toContainText(
    "The Lord of the Rings Series"
  );
});
