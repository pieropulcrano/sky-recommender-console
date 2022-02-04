Cypress.Commands.add('testSearchVodModal', (event) => {
  //dovrebbe esserci un modal apert
  cy.get('[data-test="search-vod-modal"]').should('have.length', 1);

  cy.get('[data-test="search-vod-modal"]').within(() => {
    //dovrebbe esserci scritto "no rows", il che vuol dire che non sono partite cose strane
    cy.get('.MuiDataGrid-overlay').should('have.text', 'No rows');
    cy.get('input[type="text"]').type(event);
    //clicco sul search
    cy.get(':nth-child(2) > .MuiButton-root').click();
    //dovrebbe aver trovato almeno 1 riga
    cy.get('.MuiDataGrid-row').its('length').should('be.gt', 0);
    //clicco la prima riga
    cy.get('.MuiDataGrid-row').first().click();
    //submit
    cy.get('.css-1bvc4cc > .MuiButton-root').click();
    //controllo che abbia chiuso
    cy.get('[data-test="search-vod-modal"]').should('have.length', 0);
  });
});

Cypress.Commands.add('selecetNewLine', (event, startDateEvent) => {
  // get the opened modal
  cy.get('[data-test="search-lin-modal"]').within(() => {
    // search lin event title
    cy.get('input[type="text"]').first().type(event);
    // insert startDate
    cy.get('input[type="text"]').last().type(startDateEvent);
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

Cypress.Commands.add('testSearchLinModal', () => {
  //dovrebbe esserci un modal apert
  cy.get('[data-test="search-lin-modal"]').should('have.length', 1);
});

Cypress.Commands.add('selectRandomCluster', (randomIndexClusterVal) => {
  //click on cluster select
  cy.get('[data-test="select-cluster"]').click();
  //click on cluster select
  cy.get('[data-value="' + randomIndexClusterVal + '"]').click();
});

Cypress.Commands.add('useMockDataForSchedule', () => {
  cy.fixture('recomendation-mock').then((recc) => {
    //LIN PRESENT;
    //dal 1 del mese corrente
    recc[0].validFrom = cy.setDay(1);
    //termina domani
    recc[0].validTo = cy.generateFutureDate(1);
    //LIN FUTURE;
    recc[1].validFrom = cy.generateFutureDate(1);
    recc[1].validTo = cy.generateFutureDate(2);
    //Primo Vod
    //nel passato
    recc[2].validFrom = cy.generatePastDate(1, 'day');
    //Secondo Vod
    //nel Futuro
    recc[3].validFrom = cy.generateFutureDate(1);
    cy.intercept('GET', '/recommendations?validFrom_gte=*', recc);
  });
});

Cypress.Commands.add('useMockDataForFallback', () => {
  cy.intercept('GET', '**/fallback-vod-recommendation', {
    fixture: 'fallback-recc-mock',
  });
});

Cypress.Commands.add('useMockDataForSearchVod', () => {
  cy.intercept('**/event?title=*', {
    fixture: 'vod-to-search-mock',
  });
});

Cypress.Commands.add('useMockDataForCreate', () => {
  cy.intercept({ method: 'POST', path: '/recommendations' }, (req) => {
    req.reply({
      statusCode: 201,
      body: req.body,
      delay: 10, // milliseconds
    });
  });
});

Cypress.Commands.add('useMockDataForUpdate', () => {
  cy.intercept({ method: 'PUT', path: '/recommendations/*' }, (req) => {
    req.reply({
      statusCode: 201,
      body: req.body,
      delay: 10, // milliseconds
    });
  });
});

Cypress.Commands.add('useMockDataForDelete', () => {
  cy.intercept({ method: 'DELETE', path: '/recommendations/*' }, (req) => {
    req.reply({
      statusCode: 201,
      body: {},
      delay: 10, // milliseconds
    });
  });
});
