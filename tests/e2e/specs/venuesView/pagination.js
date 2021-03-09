/// <reference types="Cypress" />

describe('Home page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/venues/**/activities**')
      .as('getActivities');
  });

  it('Can visit page via pagination component', () => {
    cy.visit('/');

    cy.wait('@getActivities');

    cy.get('.pagination__list')
      .find('.pagination__item')
      .last()
      .find('.pagination__link')
      .click();

    cy.url()
      .should('include', '?page=2');

    cy.get('.pagination__list')
      .find('.pagination__item')
      .find('.pagination__link')
      .then($links => {
        const lastPage = $links[$links.length - 2];

        cy.wrap(lastPage)
          .click()
          .invoke('text')
          .then(pageNumber => {
            cy.url()
              .should('include', `?page=${pageNumber.trim()}`);
          });
      });
  });

  it('Visit activities with valid page query', () => {
    const PAGE = 9;

    cy.visit(`/venues/164?page=${PAGE}`);

    cy.get('.pagination__list')
      .find('.pagination__item.pagination__item--active')
      .find('.pagination__link')
      .contains(PAGE);
  });
});
