/// <reference types="cypress" />



describe('Testing Schedule Page', () => {

    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:3000/schedule');



    })

    it('Correct redirect', () => {
        //check redirect su /fallback
        cy.url().should('include', '/schedule');

    })

    
    it('Check render all reccomandation', () => {

        cy.intercept({ method: 'GET', url: '**/recommendations*' }).as('searchRequest');

        cy.wait('@searchRequest').then((interception) => {
            //se non è tornato 304
            if (interception.response.statusCode = 200) {
                let reccArr = interception.response.body;
                for (var i = 0; i < reccArr.length; i++) {
                    //controlle che abbia renderizzato tutti gli elementi
                    cy.get('[data-testId="eventId-' + reccArr[i].id + '"]').should('have.length', 1);
                    //open the modal
                    cy.get('[data-testId="eventId-' + reccArr[i].id + '"]').contains(reccArr[i].type).trigger('mouseover',{force: true})
                                       
                }

            }

        });
 

    })

})