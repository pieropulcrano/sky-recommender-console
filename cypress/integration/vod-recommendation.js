let randomIndexClusterVal = 'CL_NOT_CIN';
let dateToSearch = cy.generateFutureDate(1, 'DD/MM/YYYY HH:mm');
let vodId = '166';
let eventToSearch = "L'isola che non c'è";
let mockData;

describe('Testing crud vod raccomandation', () => {
  beforeEach(() => {
    cy.visit(Cypress.env().baseUrl);
    cy.login();
  });

  /************************************CREATE******************************************************************************************************** */
  it('Check open modal', () => {
    //opena modal
    cy.contains('NEW VOD').click();
    //form in modal uspert rec vod
    cy.get('[data-test="form-upsert-rec-vod"]').should('have.length', 1);
    //button close x
    cy.get('[data-test="close-modal-btn"]').click();
    //form in modal uspert rec vod
    cy.get('[data-test="form-upsert-rec-vod"]').should('have.length', 0);
  });

  it('Check create btn on empity data', () => {
    //opena modal
    cy.contains('NEW VOD').click();
    cy.contains('Load').click();
    //form in modal uspert rec vod
    cy.get('[data-test="form-upsert-rec-vod"]').should('have.length', 1);
    cy.get('[data-test="close-modal-btn"]').click();
    //todo non esce notification ok
    //todo sniff not request
  });

  it('Check creation VOD empity form', () => {
    //opena modal
    cy.contains('NEW VOD').click();
    //devono esserci sempre 5 slot
    cy.get('[data-testid="AddCircleIcon"]').should('have.length', 5);
    cy.selectRandomCluster(randomIndexClusterVal);
    //type the date in the start date input
    cy.get('input[type="tel"]').type(dateToSearch);
    //ciclo e popolo gli slot
    cy.get('[data-testid="AddCircleIcon"]').each(($el, index, $list) => {
      //click on create
      cy.get('[data-test="submit-upsert-btn"]').click();
      //click on plus icon to add a new vod
      cy.wrap($el).find('path').click({ force: true });
      cy.testSearchVodModal(eventToSearch);
    });
    //click on create
    cy.get('[data-test="submit-upsert-btn"]').click();
    //il modale dovrebbe essere chiuso
    cy.get('[data-test="form-upsert-rec-vod"]').should('have.length', 0);
    //deve comparire notifica ok
    cy.get('[data-test="vod-update-ok-not"]').should('have.length', 1);
  });

  it('Check creation VOD using prev data', () => {
    //opena modal
    cy.contains('NEW VOD').click();

    cy.selectRandomCluster(randomIndexClusterVal);
    //type the date in the start date input
    cy.get('input[type="tel"]').type(dateToSearch);
    //click on load
    cy.contains('Load').click();
    //intercetto la get search e verifico che i dati siano correti
    //check render tutti i vod
    cy.get('[data-test-slot="prev-vod-slot"]').should('have.length', '5');

    //elimino gli slot esistenti e ne ricreo
    cy.get('[data-test-slot="prev-vod-slot"]').each(($el, index, $list) => {
      // $el is a wrapped jQuery element
      cy.wrap($el).within(() => {
        cy.get('[data-testid="ClearIcon"]').click();
      });

      //click on create
      cy.get('[data-test="submit-upsert-btn"]').click({ force: true });
      //el non dovrebbe avere + la classe di un event pieno
      //click on plus icon to add a new vod
      cy.wrap($el)
        .find('[data-testid="AddCircleIcon"] > path')
        .click({ force: true });
      cy.testSearchVodModal(eventToSearch);
    });
    //click on create
    cy.get('[data-test="submit-upsert-btn"]').click();
    //il modale dovrebbe essere chiuso
    cy.get('[data-test="form-upsert-rec-vod"]').should('have.length', 0);
    //deve comparire notifica ok
    cy.get('[data-test="vod-update-ok-not"]').should('have.length', 1);
  });

  /************************************UPDATE******************************************************************************************************** */
  it('Check update vod recommendation', () => {
    let eventId = 'eventId-' + vodId;

    // get vod rec to update;
    cy.get(`[data-testid="${eventId}"]`).click();

    // pick a random cluster
    cy.selectRandomCluster(randomIndexClusterVal);

    // select sd slot row
    cy.get('[data-test-slot="prev-vod-slot"]').each(($el, index, list) => {
      // for each slot
      // click on delete button
      cy.wrap($el).find('[data-testid="ClearIcon"]').click({ force: true });
      //click update
      cy.get('[data-test="submit-upsert-btn"]').click({ force: true });
      //click on plus icon to add a new vod
      cy.wrap($el)
        .find('[data-testid="AddCircleIcon"] > path')
        .click({ force: true });
      cy.testSearchVodModal(eventToSearch);
    });
    // submit update
    cy.contains('Update').click();

    // check for notification
    cy.contains('Vod Updated');
  });

  /************************************DELETE******************************************************************************************************** */
  it('Check delete vod recommendation', () => {
    let eventId = `eventId-${vodId}`;
    // get vod rec to delete;
    cy.get(`[data-testid="${eventId}"]`).click();
    // confirm deletion
    cy.contains('Delete').click({ force: true });
    // check for notification
    cy.contains('Vod Deleted');
  });
});
