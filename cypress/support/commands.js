Cypress.Commands.add('loginWithSession', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('https://automationexercise.com/');
    cy.contains('Signup / Login').click();
    
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();

    // Assert login is successful
    cy.contains('Logged in as').should('be.visible');
  });
});