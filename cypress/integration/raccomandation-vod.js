/// <reference types="cypress" />

import { circularProgressClasses } from "@mui/material";

describe('Testing vod raccomandation', () => {

    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:3000/');
        cy.get('.fc-newVod-button').click();

    })

   it('Check open modal', () => {     
        cy.get('[data-test="form-upsert-rec-vod"]').should('have.length',1);
        cy.get('[data-test="close-modal-btn"]').click();
        cy.get('[data-test="form-upsert-rec-vod"]').should('have.length',0);

    })


    it('Check create btn on empity data', () => {
        cy.get(':nth-child(1) > .MuiLoadingButton-root').click();
        cy.get('[data-test="form-upsert-rec-vod"]').should('have.length',1);
        cy.get('[data-test="close-modal-btn"]').click();
        //todo non esce notification ok
        //todo sniff not request

    })

    it.only('Check creation VOD using prev data', () => {
        let randomIndexCluster=cy.getRandomNumber(0,-1);
        let dateToSearch=cy.getTomorrowDate();
        //todo random index 0 ,-1
        cy.get('[data-test="select-cluster"]').click(); 
        cy.get('.MuiList-root > [tabindex="'+randomIndexCluster+'"]').click();
        cy.get('input[type="text"]').type(dateToSearch);
        cy.get('.css-piwweb-MuiGrid-root > .MuiLoadingButton-root').click()
      

    })


});