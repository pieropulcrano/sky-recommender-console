Cypress.Commands.add('testSearchVodModal', (event) => {
  //dovrebbe esserci un modal apert
  cy.get('[data-test="search-vod-modal"]').should('have.length', 1);

  cy.get('[data-test="search-vod-modal"]').within(() => {
    //dovrebbe esserci scritto "no rows", il che vuol dire che non sono partite cose strane
    cy.contains('No rows');
    cy.get('input[type="text"]').type(event);
    //clicco sul search
    cy.contains('Search').click();
    //dovrebbe aver trovato almeno 1 riga
    cy.get('No rows').should('not.exist');
    //clicco la prima riga
    cy.get(`[aria-label="Select Row checkbox"]`).click();
    //submit
    cy.contains('Select').click();
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
    cy.get('No rows').should('not.exist');
    // click on first row
    cy.get(`[aria-label="Select Row checkbox"]`).click();
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
  cy.fixture('recommendations').then((recc) => {
    //LIN PRESENT;
    //dal 1 del mese corrente
    recc.items[0].validFrom = cy.setDay(1);
    //termina domani
    recc.items[0].validTo = cy.generateFutureDate(1);
    //LIN FUTURE;
    recc.items[1].validFrom = cy.generateFutureDate(1);
    recc.items[1].validTo = cy.generateFutureDate(2);
    //Primo Vod
    //nel passato
    recc.items[2].validFrom = cy.generatePastDate(1, 'day');
    //Secondo Vod
    //nel Futuro
    recc.items[3].validFrom = cy.generateFutureDate(1);
    cy.intercept(
      'GET',
      Cypress.env().recommendationsUrl + '?validFrom=*',
      recc,
    );
  });
});

Cypress.Commands.add('useMockDataForFallback', () => {
  cy.intercept('GET', Cypress.env().fallbackRecommendationUrl + '*', {
    fixture: 'fallback-recommendation',
  });
});

Cypress.Commands.add('useMockDataForSearchVod', () => {
  cy.intercept(Cypress.env().eventUrl + '?title=*', {
    fixture: 'vod-event',
  });
});

Cypress.Commands.add('useMockDataForCreate', () => {
  cy.intercept(
    { method: 'POST', url: Cypress.env().recommendationUrl },
    (req) => {
      req.reply({
        statusCode: 201,
        body: req.body,
        delay: 10, // milliseconds
      });
    },
  );
});

Cypress.Commands.add('useMockDataForUpdate', () => {
  cy.intercept(
    { method: 'PUT', url: Cypress.env().recommendationUrl + '/*' },
    (req) => {
      req.reply({
        statusCode: 201,
        body: req.body,
        delay: 10, // milliseconds
      });
    },
  );
});

Cypress.Commands.add('useMockDataForDelete', () => {
  cy.intercept(
    { method: 'DELETE', url: Cypress.env().recommendationUrl + '/*' },
    (req) => {
      req.reply({
        statusCode: 201,
        body: {},
        delay: 10, // milliseconds
      });
    },
  );
});
