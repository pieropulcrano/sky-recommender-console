import { futurelinRec } from '../fixtures/lin-recommendation';

describe('Testing lin recommendation', () => {
  it('Check delete lin recommendation', () => {
    let toDelete;
    let eventId;

    // visit the schedule page
    cy.visit('http://localhost:3000');

    // create the lin recommendation to delete
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/recommendations',
      body: futurelinRec,
    }).then((response) => {
      expect(response.status).to.eql(201);
      // set the id of lin recommendation to delete
      // visit the schedule page
      cy.visit('http://localhost:3000');
      toDelete = response.body.id;
      eventId = `eventId-${toDelete}`;

      // get lin rec to delete;
      cy.get(`[data-testid="${eventId}"]`).click();

      // confirm deletion
      cy.contains('Delete').click();

      // check for notification
      cy.contains('Lin Deleted');
    });
  });
});
