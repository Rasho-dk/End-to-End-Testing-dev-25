describe('EKWebShop', () => {
  it('should display the homepage', () => {
    cy.visit('index.html');
    cy.get('h1').contains('EK Webshop');
  });
});