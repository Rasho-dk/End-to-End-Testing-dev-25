interface SignPage {
  SignPage(email: string, password: string): void;
}

const signupPage: SignPage = {
  SignPage(email: string, password: string) {
    cy.get("#txtEmail").type(email);
    cy.get("#txtPassword").type(password);
    cy.get("#txtRepeatPassword").type(password);
    cy.wait(2000);
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

export { loginPage, signupPage };
