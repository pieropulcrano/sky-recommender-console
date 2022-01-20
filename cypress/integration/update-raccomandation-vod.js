/// <reference types="cypress" />
import vodRec from '../fixtures/vod-recommendation';

describe('Testing vod raccomandation', () => {
  it('Check update vod recommendation', () => {
    let toUpdate;
    let eventId;
    let interceptedUpdate = false;

    // visit the schedule page
    cy.visit('http://localhost:3000');

    // create lin rec to update
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/recommendations',
      body: vodRec,
    }).then((response) => {
      expect(response.status).to.eql(201);
      toUpdate = response.body.id;
      eventId = `eventId-${toUpdate}`;

      cy.intercept({ method: 'PUT', path: '/recommendations*' }, (req) => {
        req.continue((res) => {
          interceptedUpdate = true;
        });
      }).as('updateVod');
      // visit the schedule page
      cy.visit('http://localhost:3000');

      // get vod rec to update;
      cy.get(`[data-testid="${eventId}"]`).click();

      // pick a random cluster
      let randomIndexClusterVal = cy.generateRandomCluster();
      cy.selectRandomCluster(randomIndexClusterVal);

      // select sd slot row
      cy.get('.prev-vod-slot').each(($el, index, list) => {
        // for each slot
        // click on delete button
        cy.wrap($el).find('button').click({ force: true });
        //click update
        cy.get('[data-test="submit-upsert-btn"]').click({ force: true });
        //non dovrebbe essere partita la chiamata
        cy.wrap(interceptedUpdate).should('eq', false);
        //click on plus icon to add a new vod
        cy.wrap($el)
          .find('[data-testid="AddCircleIcon"] > path')
          .click({ force: true });
        cy.testSearchVodModal();
      });

      // submit update
      cy.contains('Update').click();

      // check for notification
      cy.contains('Vod Updated');
      cy.request('DELETE', `http://localhost:3001/recommendations/1001`);
      // force refresh of the page
      cy.visit('http://localhost:3000');
    });
  });
});
