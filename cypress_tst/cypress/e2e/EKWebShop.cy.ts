import { loginPage, signupPage } from "../types/EkShop";

const email: string = "user@example.com";
const password: string = "password123";

const globalDelay: number = 8000;
describe("EKWebShop and signup", () => {
  it("should display the homepage then navigate to signup to register a new user", () => {
    cy.visit("index.html");
    cy.get("h1").contains("EK Webshop");
    cy.get("#optSignup").click();
    cy.wait(globalDelay);

    signupPage.SignPage(email, password);
    cy.get("a[href='login.html']").click();

    loginPage.SignPage(email, password);
  });
});
