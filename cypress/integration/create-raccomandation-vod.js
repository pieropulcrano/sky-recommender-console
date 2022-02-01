describe('Testing create vod raccomandation', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/');
    cy.get('.fc-newVod-button').click();
  });

  it('Check open modal', () => {
    //form in modal uspert rec vod
    cy.get('[data-test="form-upsert-rec-vod"]').should('have.length', 1);
    //button close x
    cy.get('[data-test="close-modal-btn"]').click();
    //form in modal uspert rec vod
    cy.get('[data-test="form-upsert-rec-vod"]').should('have.length', 0);
  });

  it('Check create btn on empity data', () => {
    cy.get(':nth-child(1) > .MuiLoadingButton-root').click();
    //form in modal uspert rec vod
    cy.get('[data-test="form-upsert-rec-vod"]').should('have.length', 1);
    cy.get('[data-test="close-modal-btn"]').click();
    //todo non esce notification ok
    //todo sniff not request
  });

  it('Check creation VOD empity form', () => {
    let dateToSearch = cy.generateFutureDate(1, 'DD/MM/YYYY h:mm A');
    let interceptedCreate = false;
    let randomIndexCluster = cy.getRandomNumber(1, 2);
    let randomIndexClusterVal = 'C' + randomIndexCluster;
    //intercept update search rec vod
    cy.intercept({ method: 'POST', path: '/recommendations' }, (req) => {
      req.continue((res) => {
        interceptedCreate = true;
      });
    }).as('createVod');
    //devono esserci sempre 5 slot
    cy.get('.empity-slot').should('have.length', 5);
    cy.selectRandomCluster(randomIndexClusterVal);
    //type the date in the start date input
    cy.get('input[type="text"]').type(dateToSearch);
    //ciclo e popolo gli slot
    cy.get('.empity-slot').each(($el, index, $list) => {
      //click on create
      cy.get('[data-test="submit-upsert-btn"]').click();
      //non dovrebbe esser partita la request post
      cy.wrap(interceptedCreate).should('eq', false);
      //click on plus icon to add a new vod
      cy.wrap($el)
        .find('[data-testid="AddCircleIcon"] > path')
        .click({ force: true });
      cy.testSearchVodModal();
    });
    //click on create
    cy.get('[data-test="submit-upsert-btn"]').click();
    //TUTTO OK, INTERCETTO CORRETTAMENTE IL MESSAGGIO DI USCITA
    cy.wait('@createVod').should(({ req, response }) => {
      expect(response.statusCode).to.equal(201);
      //il modale dovrebbe essere chiuso
      cy.get('[data-test="form-upsert-rec-vod"]').should('have.length', 0);
      //deve comparire notifica ok
      cy.get('[data-test="vod-update-ok-not"]').should('have.length', 1);
      cy.request(
        'DELETE',
        `http://localhost:3001/recommendations/${response.body.id}`,
      );
      // force refresh view
      cy.visit('http://localhost:3000');
    });
  });

  it('Check creation VOD using prev data', () => {
    let dateToSearch = cy.generateFutureDate(1, 'DD/MM/YYYY h:mm A');
    let dateToSend = encodeURIComponent(
      Cypress.dayjs(dateToSearch, 'DD/MM/YYYY h:mm A').format(
        'ddd MMM DD YYYY',
      ),
    ); //todo da risistemare formato in accordo con server
    let randomIndexCluster = cy.getRandomNumber(1, 2);
    let randomIndexClusterVal = 'C' + randomIndexCluster;
    let interceptedCreate = false;
    //intercept get search rec vod
    cy.intercept({ method: 'GET', path: '/recommendations*' }, (req) => {
      delete req.headers['if-none-match'];
    }).as('searchRequest');
    //intercept update search rec vod
    cy.intercept({ method: 'POST', path: '/recommendations' }, (req) => {
      req.continue((res) => {
        interceptedCreate = true;
      });
    }).as('createVod');

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
      cy.get('.prev-vod-slot').should(
        'have.length',
        body.recommendation.length,
      );
      //se la data tornata dalla request è minore di oggi:
      if (Cypress.dayjs().isAfter(body.validFrom, 'minute')) {
        //il div parent primo di input dovrebbe avere classe error
        cy.get('input[type="text"]').parent().should('have.class', 'Mui-error');
        //click on create
        cy.get('[data-test="submit-upsert-btn"]').click();
        cy.wrap(interceptedCreate).should('eq', false);
        //svuoto la text
        cy.get('input[type="text"]').clear();
        //type a correct date in the start date input
        cy.get('input[type="text"]').type(dateToSearch);
      }
    });
    //elimino gli slot esistenti e ne ricreo
    cy.get('.prev-vod-slot').each(($el, index, $list) => {
      // $el is a wrapped jQuery element
      cy.wrap($el).find('button').click();
      //click on create
      cy.get('[data-test="submit-upsert-btn"]').click();
      //non dovrebbe esser partita la request post
      cy.wrap(interceptedCreate).should('eq', false);
      //el non dovrebbe avere + la classe di un event pieno
      cy.wrap($el).should('not.have.class', 'prev-vod-slot');
      //click on plus icon to add a new vod
      cy.wrap($el)
        .find('[data-testid="AddCircleIcon"] > path')
        .click({ force: true });
      cy.testSearchVodModal();
    });
    //click on create
    cy.get('[data-test="submit-upsert-btn"]').click();
    cy.wait(2000);
    //TUTTO OK, INTERCETTO CORRETTAMENTE IL MESSAGGIO DI USCITA
    cy.wait('@createVod').should(({ req, response }) => {
      expect(response.statusCode).to.equal(201);
      //il modale dovrebbe essere chiuso
      cy.get('[data-test="form-upsert-rec-vod"]').should('have.length', 0);
      //deve comparire notifica ok
      cy.get('[data-test="vod-update-ok-not"]').should('have.length', 1);
      cy.request(
        'DELETE',
        `http://localhost:3001/recommendations/${response.body.id}`,
      );
      // force refresh view
      cy.visit('http://localhost:3000');
    });
  });
});
