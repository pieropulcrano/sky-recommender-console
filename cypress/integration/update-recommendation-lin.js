import linRec from '../fixtures/lin-recommendation';

describe('Testing lin recommendation', () => {
  it('Check update lin recommendation', () => {
    let toUpdate;
    let eventId;

    // visit the schedule page
    cy.visit('http://localhost:3000/schedule');

    // create lin rec to update
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/recommendations',
      body: linRec,
    }).then((response) => {
      expect(response.status).to.eql(201);
      toUpdate = response.body.id;
      eventId = `eventId-${toUpdate}`;

      // get lin rec to update;
      cy.get(`[data-testid="${eventId}"]`).click();

      // pick a random cluster
      let randomIndexClusterVal = cy.generateRandomCluster();
      cy.selectRandomCluster(randomIndexClusterVal);

      // select sd slot row
      cy.get('[data-testid="sd-slot-row"]')
        .find('[data-testid="AddCircleIcon"] > path')
        .each(($el, index, list) => {
          // for each slot
          // click on add button
          cy.wrap($el).click({ force: true });
          // get the opened modal
          cy.get('[data-test="search-lin-modal"]').within(() => {
            // search lin event title
            cy.get('input[type="text"]').first().type("L'immortale");
            // insert startDate
            cy.get('input[type="text"]').last().type('19/01/2022 6:29 PM');
            // click on search button
            cy.contains('Search').click();
            // it should be at least one result
            cy.get('.MuiDataGrid-row').its('length').should('be.gt', 0);
            // click on first row
            cy.get('.MuiDataGrid-row').first().click();
            // click on submit
            cy.contains('Select').click();
          });
        });

      // select hd slot row
      cy.get('[data-testid="hd-slot-row"]')
        .find('[data-testid="AddCircleIcon"] > path')
        .each(($el, index, list) => {
          // for each slot
          // click on add button
          cy.wrap($el).click({ force: true });
          // get the opened modal
          cy.get('[data-test="search-lin-modal"]').within(() => {
            // search lin title
            cy.get('input[type="text"]').first().type('Avatar');
            // insert startDate
            cy.get('input[type="text"]').last().type('19/01/2022 6:29 PM');
            // click on search button
            cy.contains('Search').click();
            // it should be at least one result
            cy.get('.MuiDataGrid-row').its('length').should('be.gt', 0);
            // click on first row
            cy.get('.MuiDataGrid-row').first().click();
            // click on submit button
            cy.contains('Select').click();
          });
        });

      // submit update
      cy.contains('Update').click();

      // check for notification
      cy.contains('Lin Updated');

      // delete created notification
      cy.request('DELETE', `http://localhost:3001/recommendations/1000`);

      // force refresh of the page
      cy.visit('http://localhost:3000/schedule');
    });
  });
});
