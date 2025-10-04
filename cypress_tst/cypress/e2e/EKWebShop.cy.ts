import { loginPage, signupPage, Article } from "../types/EkShop";
import "cypress-xpath";

const email: string = "user@example.com";
const password: string = "password123";
const mensShirt: string = "Mens Casual Premium Slim Fit T-Shirts";
const productName: string =
  "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s";

const globalDelay: number = 8000;

describe("EKWebShop and signup", () => {
  it("should display the homepage then navigate to signup to register a new user", () => {
    cy.visit("");
    cy.get("h1").contains("EK Webshop");
    cy.get("#optSignup").click();

    // cy.wait(globalDelay);

    signupPage.SignPage(email, password);
    cy.wait(2000);

    cy.get("button[title='Close Alert']").then(($alert) => {
      if ($alert.is(":visible")) {
        cy.wrap($alert).click();
      }
    });
    cy.get("a[href='login.html']").click();
    cy.wait(2000);

    loginPage.SignPage(email, password);

    
    cy.xpath(Article(productName)).within(() => {
      cy.get("button").should("contain.text", "Add to cart").click();
    });

    //TODO: TO BE CONTINUED (THE REST OF THE TEST)


  });
});
