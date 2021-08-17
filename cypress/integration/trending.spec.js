describe('Giphy Trending Section', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('trending section is presented to the user after page load', () => {
        cy.contains('Trending').should('be.visible');
    });

    it('user can navigate to more trending gifs by clicking the trending header', () => {
        cy.contains('Trending').click();
        cy.url().should('include', '/trending-gifs');
    });

    it('user can navigate to the full page version of a gif by clicking on it from the trending section', () => {
        cy.get('.bKPIpm')
            .first()
            // restrict context to first <li> in trending section
            .within(() => {
                cy.get('picture img')
                    .as('image');
                cy.get('@image')
                    .invoke('attr', 'alt')
                    .then(alt => {
                        // click the image to navigate to full page version. Use force: true due to navbar overlaying image
                        cy.get('@image').click({ force: true });
                        // the new page should contain the same gif - use alt attribute for verification
                        // ideally the assertion would be a '.should(be.visible)', but Giphy is doing something
                        // with opacity: 0||1 which made that an unstable option for the moment
                        cy.get(`img[alt="${alt}"]`, { withinSubject: null }).should('exist');
                    });
            });
    });
});