let randomIndexClusterVal = 'C1';
let dateToSearch = cy.generateFutureDate(1, 'DD/MM/YYYY h:mm A');
let vodId = '166';
let eventToSearch = "L'isola che non c'è";
let mockData = [];

describe('Testing crud vod raccomandation', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.useMockDataForSchedule();
    cy.useMockDataForFallback();
    cy.useMockDataForSearchVod();
    //parsing fixture
    cy.fixture('prev-recc-vod-mock').then((val) => {
      val[0].validFrom = cy.generatePastDate(1, 'month');
      mockData.push(val[0]);
    });
    cy.intercept(
      { method: 'GET', path: '/recommendations?cluster=C1&type=VOD&*' },
      (req) => {
        req.reply({
          statusCode: 201,
          body: mockData,
          delay: 10, // milliseconds
        });
      },
    ).as('searchRequest');
    cy.fixture('vod-recc-mock').then((recc) => {
      recc[0].validFrom = cy.generateFutureDate(1);
      cy.intercept('GET', '**/recommendations?id=' + vodId, recc);
    });
    cy.useMockDataForCreate();
    cy.useMockDataForUpdate();
    cy.useMockDataForDelete();
    cy.visit('http://localhost:3000/');
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
    cy.get('.empity-slot').should('have.length', 5);
    cy.selectRandomCluster(randomIndexClusterVal);
    //type the date in the start date input
    cy.get('input[type="text"]').type(dateToSearch);
    //ciclo e popolo gli slot
    cy.get('.empity-slot').each(($el, index, $list) => {
      //click on create
      cy.get('[data-test="submit-upsert-btn"]').click();
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

  it('Check creation VOD using prev data', () => {
    let dateToSend = encodeURIComponent(
      Cypress.dayjs(dateToSearch, 'DD/MM/YYYY h:mm A').format(
        'ddd MMM DD YYYY',
      ),
    );
    //opena modal
    cy.contains('NEW VOD').click();

    cy.selectRandomCluster(randomIndexClusterVal);
    //type the date in the start date input
    cy.get('input[type="text"]').type(dateToSearch);
    //click on load
    cy.get('.css-piwweb-MuiGrid-root > .MuiLoadingButton-root').click();
    //check if contains correct parameter cluster
    cy.get('@searchRequest')
      .its('request.url')
      .should('to.match', new RegExp('cluster=' + randomIndexClusterVal));
    //check if contains correct parameter validFrom_lte
    cy.get('@searchRequest')
      .its('request.url')
      .should('to.match', new RegExp('validFrom_lte=' + dateToSend));
    //check type on request
    cy.get('@searchRequest')
      .its('request.url')
      .should('to.match', new RegExp('type=VOD'));
    //intercetto la get search e verifico che i dati siano correti

    cy.wait('@searchRequest').should(({ req, response }) => {
      let body = response.body[0];
      //check render tutti i vod
      cy.get('[data-test-slot="prev-vod-slot"]').should(
        'have.length',
        body.recommendation.length,
      );
    });
    //elimino gli slot esistenti e ne ricreo
    cy.get('[data-test-slot="prev-vod-slot"]').each(($el, index, $list) => {
      // $el is a wrapped jQuery element
      cy.wrap($el).within(() => {
        cy.get('button').click();
      });

      //click on create
      cy.get('[data-test="submit-upsert-btn"]').click({ force: true });
      //el non dovrebbe avere + la classe di un event pieno
      // cy.wrap($el).should('not.have.class', 'prev-vod-slot');
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
      cy.wrap($el).find('button').click({ force: true });
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
