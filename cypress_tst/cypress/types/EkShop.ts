interface SignPage {
  SignPage(email: string, password: string): void;
}

const signupPage: SignPage = {
  SignPage(email: string, password: string) {
    cy.get("#txtEmail").type(email);
    cy.get("#txtPassword").type(password);
    cy.get("#txtRepeatPassword").type(password);
    cy.wait(5000);
    cy.get('input[type="submit"]').click();
  },
};

const loginPage: SignPage = {
  SignPage(email: string, password: string) {
    cy.get("#txtEmail").type(email);
    cy.get("#txtPassword").type(password);
    cy.get('input[type="submit"]').click();
  },
};

const Article = (productName: string) => {
  return `//article[header/h2[text()='${productName}']]`;
};

export { Article, loginPage, signupPage };
