/// <reference types="cypress" />
import fallbackRec from '../fixtures/fallback-reccomendation';

describe('Testing Fallback Page', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000');
    cy.wait(2000);
    cy.get('[data-test="fallback-nav-tab"]').click();
  });

  it('Check All fallbacks', () => {
    cy.request('GET', 'http://localhost:3001/fallback-vod-recommendation').then(
      (response) => {
        //per prima cosa mi salvo la response
        let fallbacks = response.body[0].recommendation;
        //verifico che siano visibili tutti
        cy.get('.fallback-slot').should('have.length', fallbacks.length);
        //loop fallback response
        for (var i = 0; i < fallbacks.length; i++) {
          //single event
          cy.get('[data-test="' + fallbacks[i].id + '"]').as('event');
          cy.get('@event')
            .find('[data-test="event-title"]')
            .should('have.text', fallbacks[i].title);
          cy.get('@event')
            .find('[data-test="event-startProgram"]')
            .should('not.be.empty');
          cy.get('@event')
            .find('[data-test="event-endProgram"]')
            .should('not.be.empty');
        }
      },
    );
  });

  it('Check fallback events', () => {
    cy.get('.MuiSvgIcon-colorError').first().click({ force: true });
    //click update senza un'elemnto dovrebbe dare errore
    cy.get('.MuiLoadingButton-root').click({ force: true });
    //non dovrebbe comparire notifica ok
    cy.get('[data-test="vod-fallback-ok-not"]').should('have.length', 0);
    //dovrebbe esserci un solo + svg
    cy.get('[data-testid="AddCircleIcon"] > path')
      .should('have.length', 1)
      .click({ force: true });
    //testing search Vod Modal
    cy.testSearchVodModal();
    //risave
    cy.get('.MuiLoadingButton-root').click({ force: true });
    /*cy.request({
      method: 'PUT',
      url: 'http://localhost:3001/fallback-vod-recommendation/1',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: fallbackRec,
    });*/
    //cy.wait(2000);
    //dovrebbe esser comparsa la  notifica di ok
    cy.get('[data-test="vod-fallback-ok-not"]').should('have.length', 1);
  });

  it('Check clear button', () => {
    //check exist
    cy.get('.MuiButton-containedPrimary')
      .as('clearButton')
      .should('have.length', 1)
      .click({ force: true });
    //dovrebbe aver eliminato tutti i vod event, quindi dovrebbero esserci 10 +
    cy.get('[data-testid="AddCircleIcon"]').should('have.length', 10);
    //click update senza elementi dovrebbe dare errore
    cy.get('.MuiLoadingButton-root').click({ force: true });
    //non dovrebbe comparire notifica ok
    cy.get('[data-test="vod-fallback-ok-not"]').should('have.length', 0);
  });
});
