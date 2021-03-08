/// <reference types="Cypress" />

describe('Cart', () => {
  beforeEach(() => {
    // cy.intercept('GET', '**/api/v3/venues/**').as('getActivities');

    cy.visit('/');
  });

  it('Cart', () => {
    cy.get('.header-bag').within(() => {
      cy.get('.cart').and('be.visible');
      cy.get('.cart-counter').should('not.exist');

      cy.get('.cart__price')
        .and('be.visible')
        .and('contain', '0.00');
    });
  });
});
