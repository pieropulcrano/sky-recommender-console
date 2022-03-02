/// <reference types="cypress" />
describe('Testing Fallback Page', () => {
  let fallbackData;
  let eventToSearch = "L'isola che non c'è";
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.useMockDataForSchedule();
    cy.useMockDataForFallback();
    cy.mockLogin();
    cy.useMockDataForSearchVod();
    cy.intercept(
      { method: 'PUT', url: Cypress.env().fallbackRecommendationUrl },
      (req) => {
        req.reply({
          statusCode: 201,
          body: req.body,
          delay: 10, // milliseconds
        });
      },
    );
    //parsing fixture
    cy.fixture('fallback-recommendation').then((val) => {
      fallbackData = val.items[0].recommendation;
    });
    cy.visit(Cypress.env().baseUrl);
    cy.login();
    cy.wait(2000);
    cy.contains('Fallback').click();
  });

  it('Check All fallbacks', () => {
    //verifico che siano visibili tutti
    cy.get('[data-test-slot="fallback-slot"]').should(
      'have.length',
      fallbackData.length,
    );
    //loop fallback response
    for (var i = 0; i < fallbackData.length; i++) {
      //single event
      cy.get('[data-test="' + fallbackData[i].id + '"]').as('event');
      cy.contains(fallbackData[i].title);
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

  it('Check clear button', () => {
    //check exist
    cy.contains('Clear')
      .as('clearButton')
      .should('have.length', 1)
      .click({ force: true });
    //dovrebbe aver eliminato tutti i vod event, quindi dovrebbero esserci 10 +
    cy.get('[data-testid="AddCircleIcon"]').should('have.length', 10);
    //click update senza elementi dovrebbe dare errore
    cy.contains('Update').click({ force: true });
    //non dovrebbe comparire notifica ok
    cy.get('[data-test="vod-fallback-ok-not"]').should('have.length', 0);
  });
});
