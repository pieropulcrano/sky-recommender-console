import vodRec from '../fixtures/vod-recommendation';

describe('Testing vod recommendation', () => {
  it('Check delete vod recommendation', () => {
    let toDelete;
    let eventId;

    // visit the schedule page
    cy.visit('http://localhost:3000');

    // create the lin recommendation to delete
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/recommendations',
      body: vodRec,
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
      cy.contains('Vod Deleted');
    });
  });
});
