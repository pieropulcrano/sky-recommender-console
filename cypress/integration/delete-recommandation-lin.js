import linRec from '../fixtures/lin-recommendation';

describe('Testing lin recommendation', () => {
  it('Check delete lin recommendation', () => {
    let toDelete;
    let eventId;

    cy.intercept({ method: 'POST', path: '/recommendations' }).as('createLin');

    cy.intercept({
      method: 'GET',
      path: 'http://localhost:3001/recommendations*',
    }).as('loadLin');

    // visit the schedule page
    cy.visit('http://localhost:3000/schedule');

    // intercept call to create new lin recommendation to update

    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/recommendations',
      body: linRec,
    }).then((response) => {
      expect(response.status).to.eql(201);
      toDelete = response.body.id;
      eventId = `eventId-${toDelete}`;

      // get lin rec to update;
      cy.get(`[data-testid="${eventId}"]`).click();

      // intercept does not work goddam
      cy.wait(2000);

      // invia
      cy.contains('Delete').click();

      cy.contains('Lin Deleted');
    });
  });
});
