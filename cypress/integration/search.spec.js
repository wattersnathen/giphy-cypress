describe('Giphy Search Feature', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input[type="text"]').as('searchInput')
    });

    it('search field is presented to the user', () => {
        cy.get('@searchInput').should('be.visible');
    });

    it('user can search for a gif of their choosing', () => {
        const searchTerm = 'SpongeBob';
        cy.get('@searchInput')
            .type(searchTerm)
            .type('{enter}');
        cy.url().should('include', `/search/${searchTerm}`);
        cy.get('h1').should('have.text', searchTerm);
    });
});