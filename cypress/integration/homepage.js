/// <reference types="cypress" />
describe('Testing Home Page', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/');
  });

  it('Correct redirect', () => {
    //check redirect su /schedule
    cy.url().should('include', '/');
  });

  it('Check AppBar', () => {
    //check exist appbar
    cy.get('[data-test="app-bar"]');
  });

  it('Check navigation Tabs', () => {
    //check exist appbar
    cy.get('[data-test="nav-tabs"]').within(() => {
      //dovrebbe avere 2 pulsanti schedule e fallback
      cy.get('button').should('have.length', 2);
      //il primo è schedul e dovrebbe essere selezionato di default
      cy.get('button').first().should('have.text', 'Schedule');
      cy.get('button')
        .first()
        .should('have.attr', 'aria-selected')
        .and('equal', 'true');
      //il secondo è fallback e non dovrebbe essere selezionato
      cy.get('button').last().should('have.text', 'Fallback');
      cy.get('button')
        .last()
        .should('have.attr', 'aria-selected')
        .and('equal', 'false');
      cy.wait(2000);
      //check the Fallback Tab redirect
      cy.get('[tabindex="-1"]').click();
      // cy.url().should('include', '/fallback');
      //il primo è schedul e NON dovrebbe essere selezionato di default
      cy.get('button').first().should('have.text', 'Schedule');
      cy.get('button')
        .first()
        .should('have.attr', 'aria-selected')
        .and('equal', 'false');
      //il secondo è fallback e dovrebbe essere selezionato
      cy.get('button').last().should('have.text', 'Fallback');
      cy.get('button')
        .last()
        .should('have.attr', 'aria-selected')
        .and('equal', 'true');

      //check the Schedule Tab redirect
      cy.get('[tabindex="-1"]').click();
      //cy.url().should('include', '/schedule');
      //il primo è schedul e NON dovrebbe essere selezionato di default
      cy.get('button').first().should('have.text', 'Schedule');
      cy.get('button')
        .first()
        .should('have.attr', 'aria-selected')
        .and('equal', 'true');
      //il secondo è fallback e dovrebbe essere selezionato
      cy.get('button').last().should('have.text', 'Fallback');
      cy.get('button')
        .last()
        .should('have.attr', 'aria-selected')
        .and('equal', 'false');
    });
  });
});
/*it('Search By title', () => {
//Find the element with content Tmp searchBox to open modal with form'
cy.contains('Tmp searchBox').click();
//inside form
cy.get('form').within(() => {
//click input by id and type
cy.get('#title').type('The', { force: true })
//click on search button
cy.get('#search_line_btn').click();
//la tabellina dei risultati:
cy.get('.MuiDataGrid-virtualScroller.css-1pans1z-MuiDataGrid-virtualScroller').within(() => {
    //dovrebbe trovare uno solo
     cy.get('div[role="row"]').should('have.length', 1);//il div = tr
});
//submit the form
cy.get('button[type="submit"]').click();

})

})

it('Search By Date', () => {
const dateToSelect = "Jan 7, 2022";
//Find the element with content Tmp searchBox to open modal with form'
cy.contains('Tmp searchBox').click();
//inside form
cy.get('form').within(() => {
//insert a date
cy.get('#mui-7').type('07/01/2022 12:24 PM', { force: true })
//click on search button
cy.get('#search_line_btn').click();
//la tabellina dei risultati:
cy.get('.MuiDataGrid-virtualScroller.css-1pans1z-MuiDataGrid-virtualScroller').within(() => {
  //dovrebbe trovare uno solo
  cy.get('div[role="row"]').should('have.length', 3);//il div = tr
});
//submit the form
cy.get('button[type="submit"]').click();
//
})

})

/*  it('renders learn react link', () => {
mount(<App />);
cy.get('a').contains('Learn React');
});*/
