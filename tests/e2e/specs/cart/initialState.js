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
        cy.get('.cart')
          .and('be.visible');
        cy.get('.cart-counter')
          .should('not.exist');

        cy.get('.cart__price')
          .and('be.visible')
          .and('contain', '0.00');
      });
  });
});

