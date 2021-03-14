/// <reference types="Cypress" />

const addItem = () => {
  cy.wait('@getActivities')
    .its('response.body')
    .should('have.length.above', 0);

  cy.get('.product-list')
    .should('have.descendants', '.product-list__item');

  cy.get('.product-list__item')
    .first()
    .find('button.product__add-to-cart')
    .click();

  // check if in-cart items cound had increased
  cy.get('.baseStorage-counter')
    .should('be.visible')
    .contains('1');

  // check if total had price changed and equals item price
  cy.get('.cartPrice')
    .should('be.visible')
    .then($cartPriceEl => {
      cy.get('.product-list__item')
        .first()
        .find('.product__price')
        .find('span')
        .last()
        .then($productPriceEl => {
          const [ , productPrice ] = $productPriceEl.text().split(' ');
          const [ , cartTotalPrice ] = $cartPriceEl.text().split(' ');

          expect(cartTotalPrice).be.equal(productPrice);
        });
    });

  cy.get('.product-list__item')
    .first()
    .find('button.product__add-to-cart')
    .contains('in cart')
    .should('have.class', 'button--in-cart');

  cy.get('.product-list__item')
    .first()
    .find('button.product__wishlist-button')
    .should('have.class', 'button--disabled');

  cy.get('.baseStorage')
    .first()
    .click();

  cy.get('.dropdown-wrapper')
    .find('.dropdown')
    .should('be.visible')
    .within(() => {
      cy.get('.menu-list')
        .should('have.descendants', '.menu-item')
        .find('.menu-item')
        .should('have.length', 1);
    });
};

describe('Adding/removing items to/from cart', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/venues/**/activities**')
      .as('getActivities');

    cy.visit('/');
  });

  it('Add item to cart', addItem);

  it('Remove item from cart', () => {
    addItem();

    cy.get('.menu-list')
      .should('have.descendants', '.menu-item')
      .find('.menu-item')
      .first()
      .find('.menu-item__close-icon')
      .click();

    cy.get('.dropdown-wrapper')
      .find('.dropdown')
      .should('be.visible')
      .within(() => {
        cy.get('.menu-list')
          .should('not.exist');

        cy.get('.baseStorage-content__placeholder')
          .should('be.visible')
          .should('not.be.empty');
      });
  });
});
