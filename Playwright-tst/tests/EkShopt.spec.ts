import { expect, test } from "@playwright/test";
import { type SignPage, fillAndAssert } from "./types/EkShop";

const email: string = "test3@example.com";
const password: string = "password123";

test.describe("EkShop", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5500/"); // Uses baseURL from config
  });

  test("EKS-1: Verify that the EkShop website loads successfully", async ({
    page,
  }) => {
    // Now the page is already at '/'
    await expect(
      page.getByRole("heading", { name: "EK Webshop" })
    ).toBeVisible();
  });

  test("Click sign up button", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "EK Webshop" })
    ).toBeVisible();

    await page.getByRole("link", { name: "Sign Up" }).click();

    const signupPage: SignPage = {
      SignPage: async (email: string, password: string) => {
        await fillAndAssert(page.locator("#txtEmail"), email);
        await fillAndAssert(page.locator("#txtPassword"), password);
        await fillAndAssert(page.locator("#txtRepeatPassword"), password);
      },
    };
    await expect(page).toHaveURL(/.*signup/);

    await signupPage.SignPage(email, password);

    await page.locator('input[type="submit"]').click();
  });

  //TODO: Add  more test cases here (e.g., login, add to cart, checkout, etc.)
});
