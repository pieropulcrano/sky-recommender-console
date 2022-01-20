// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { FALLBACK_VOD_TITLE_TO_SEARCH } from './constants';

Cypress.Commands.add('testSearchVodModal', () => {
  //dovrebbe esserci un modal apert
  cy.get('[data-test="search-vod-modal"]').should('have.length', 1);

  cy.get('[data-test="search-vod-modal"]').within(() => {
    //dovrebbe esserci scritto "no rows", il che vuol dire che non sono partite cose strane
    cy.get('.MuiDataGrid-overlay').should('have.text', 'No rows');
    cy.get('input[type="text"]').type(FALLBACK_VOD_TITLE_TO_SEARCH);
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
