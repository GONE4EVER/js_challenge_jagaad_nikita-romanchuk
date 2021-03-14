/// <reference types="Cypress" />

describe('Cart initial state', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/venues/**/activities**')
      .as('getActivities');

    cy.visit('/');
  });

  it('Cart initial state is valid', () => {
    cy.get('.header-bag')
      .within(() => {
        cy.get('.baseStorage')
          .and('be.visible');
        cy.get('.baseStorage-counter')
          .should('not.exist');

        cy.get('.cartPrice')
          .and('be.visible')
          .and('contain', '0.00');
      });
  });
});

