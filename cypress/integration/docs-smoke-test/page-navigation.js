import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Page navigation', () => {
  it('should highlight menu item appropriately when using content menu on page with 2 nav levels', () => {
    cy.visit(`${URL_DOCS_SMOKE_TEST}views/two-level-index-nav#ipsum`);
    cy.findByLabelText('Page Table of Contents Navigation').within(() => {
      cy.get('a[href="#content-menu-with-first-level-heading"]')
        // this item is highlighted
        .should('not.have.css', 'border-left-color', 'rgba(0, 0, 0, 0)')
        // but this is not the current item
        .invoke('attr', 'aria-current')
        .should('contain', 'false');
    });
  });
});
