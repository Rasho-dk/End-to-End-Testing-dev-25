import { expect } from "@playwright/test";

export interface SignPage {
  SignPage(email: string, password: string): Promise<void>;
}

const fillAndAssert = async (locator, value) => {
  await locator.fill(value);
  await expect(locator).toHaveValue(value);
};

export { fillAndAssert };
