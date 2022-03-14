/// <reference types="cypress" />
import fallback from '../../src/mocks/data/fallback-recommendation';

describe('Testing Fallback Page', () => {
  let eventToSearch = "L'isola che non c'è";
  beforeEach(() => {
    cy.visit(Cypress.env().baseUrl);
    cy.login();
    cy.wait(2000);
    cy.contains('Fallback').click();
  });

  it('Check All fallbacks', () => {
    //verifico che siano visibili tutti
    cy.get('[data-test-slot="fallback-slot"]').should(
      'have.length',
      fallback.recommendation.length,
    );
    //loop fallback response
    for (var i = 0; i < fallback.recommendation.length; i++) {
      //single event
      cy.get('[data-test="' + fallback.recommendation[i].id + '"]').as('event');
      cy.contains(fallback.recommendation[i].title);
      cy.get('@event')
        .find('[data-test="event-startProgram"]')
        .should('not.be.empty');
      cy.get('@event')
        .find('[data-test="event-endProgram"]')
        .should('not.be.empty');
    }
  });

  it('Check fallback events', () => {
    cy.get('[data-testid="ClearIcon"]').first().click({ force: true });
    //click update senza un'elemnto dovrebbe dare errore
    cy.contains('Update').click({ force: true });
    //non dovrebbe comparire notifica ok
    cy.get('[data-test="vod-fallback-ok-not"]').should('have.length', 0);
    //dovrebbe esserci un solo + svg
    cy.get('[data-testid="AddCircleIcon"] > path')
      .should('have.length', 1)
      .click({ force: true });
    //testing search Vod Modal
    cy.testSearchVodModal(eventToSearch);
    //risave
    cy.contains('Update').click({ force: true });
    //dovrebbe esser comparsa la  notifica di ok
    cy.get('[data-test="vod-fallback-ok-not"]').should('have.length', 1);
  });
});
