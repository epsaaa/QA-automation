describe('Product browsing and filtering', () => {
    it('should navigate to product page', () => {
        cy.visit('https://automationexercise.com/');

        cy.contains('Products').click();

        cy.url().should('include', '/products');
        cy.contains('All Products').should('be.visible');
        
    })
    
})