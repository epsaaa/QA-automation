import { faker } from '@faker-js/faker';

describe('User Registration', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com/');
    cy.contains('Signup / Login').click();
  });

  it('registers a new user with random details', () => {
    const fullName = faker.name.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const company = faker.company.name();
    const address = faker.address.streetAddress();
    const phone = faker.phone.number('98########');

    cy.get('input[data-qa="signup-name"]').type(fullName);
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').click();

    cy.get('#id_gender2').check();
    cy.get('#password').type(password);
    cy.get('#days').select('23');
    cy.get('#months').select('May');
    cy.get('#years').select('2003');
    
    cy.get('#newsletter').check();
    cy.get('#optin').check();

    cy.get('#first_name').type(faker.name.firstName());
    cy.get('#last_name').type(faker.name.lastName());
    cy.get('#company').type(company);
    cy.get('#address1').type(address);
    cy.get('#address2').type(address);
    cy.get('#country').select('India');
    cy.get('#state').type('Bagmati');
    cy.get('#city').type('Kathmandu');
    cy.get('#zipcode').type('44600');
    cy.get('#mobile_number').type(phone);

    cy.get('button[data-qa="create-account"]').click();
    cy.contains('Account Created!').should('be.visible');

    cy.get('a[data-qa="continue-button"]').click({ force: true });
    cy.contains(`Logged in as ${fullName}`).should('be.visible');
 
  });

  it('shows error when registering with a duplicate email', () => {
    const duplicateEmail = 'Sylvia.Jacobs@yahoo.com';
    const fullName = faker.name.fullName();

    cy.get('input[data-qa="signup-name"]').type(fullName);
    cy.get('input[data-qa="signup-email"]').type(duplicateEmail);
    cy.get('button[data-qa="signup-button"]').click();

    cy.contains('New User Signup!').should('be.visible');
    cy.contains('Email Address already exist!').should('be.visible');
    });

    it('should keep user logged in using saved session', () => {
    const email = 'Sylvia.Jacobs@yahoo.com'; // registered user email
    const password = 'asdfgh';    // password you used during registration

    cy.loginWithSession(email, password);

    cy.visit('https://automationexercise.com/');
    cy.contains(`Logged in as`).should('be.visible');

    


});
});
