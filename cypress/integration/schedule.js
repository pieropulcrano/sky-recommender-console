/// <reference types="cypress" />

describe('Testing Schedule Page', () => {
  it('Check render all reccomandation', () => {
    cy.useMockDataForSchedule();
    cy.useMockDataForFallback();
    cy.intercept({ method: 'GET', url: '**/recommendations*' }, (req) => {
      delete req.headers['if-none-match'];
    }).as('searchRequest');
    cy.visit('http://localhost:3000');
    cy.wait('@searchRequest').then((interception) => {
      //se non è tornato 304
      if (interception.response.statusCode == 200) {
        let reccArr = interception.response.body;
        for (var i = 0; i < reccArr.length; i++) {
          //controlle che abbia renderizzato tutti gli elementi
          cy.get('[data-testId="eventId-' + reccArr[i].id + '"]').should(
            'have.length',
            1,
          );
          //open the modal
          cy.get('[data-testId="eventId-' + reccArr[i].id + '"]')
            .contains(reccArr[i].type)
            .trigger('mouseover', { force: true });
        }
      }
    });
  });
});
