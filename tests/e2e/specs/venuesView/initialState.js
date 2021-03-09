/// <reference types="Cypress" />

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('App uri is correct', () => {
    const appURI = cy.url();

    appURI.should('include', '/venues/');
    appURI.should('include', '?page=1');
  });

  it('Home page layout has header and footer & main sections', () => {
    cy.get('.baseLayout').within(() => {
      cy.get('.appHeader').and('be.visible');
      cy.get('.appHeader__title').contains('brand');

      cy.get('.appFooter').and('be.visible');
      cy.get('.appFooter__title').contains('footer');
    });
  });

  it('App displays loading state while waiting for initial requests to resolve', () => {
    cy.intercept('GET', '**/api/v3/venues/**').as('getVenueDetails');
    cy.intercept('GET', '**/activities**').as('getActivities');

    const appSpinner = '.venues-page-container__placeholder';

    cy.get(appSpinner)
      .should('be.visible');

    cy.wait('@getVenueDetails')
      .its('response.body')
      .should('not.be.empty');

    cy.wait('@getActivities');

    cy.get(appSpinner)
      .should('not.exist');
  });
});
