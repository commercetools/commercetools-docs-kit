import { URL_API_DOCS_SMOKE_TEST } from '../../support/urls';

describe('API type soft linking', () => {
  it('should go to page of a type, then find the page of linked property type', () => {
    cy.visit(URL_API_DOCS_SMOKE_TEST);
    cy.get('#navigation-scroll-container').within(() => {
      cy.findByText('Soft Linking First Page').click();
    });
    cy.findByLabelText('SoftLinkObject definition').should('be.visible');
    cy.get('.section-lead').within(() => {
      cy.findByText('SoftLinkArray').click();
    });

    /**
     * As stated in ../docs-smoke-test/viewports.js:
     *  Currently snapshots with scroll postion are not supported by Percy.
     *  https://github.com/percy/percy-cypress/issues/2#issuecomment-533316240
     *
     * So this test will instead:
     *  - check if element with expected id exists
     *  - in this case the id should be ctp-test-type-softlinkarray
     */

    /**
     * TODO:
     *
     * - urn id does not work with tests, will need to standardize pattern by replacing
     * ":" with "-" and making sure letters are lower cased
     * - api-docs-smoke-test-e2e replicates snapshots, no need to have separate project on percy
     */
    cy.get('#body-content')
      .find('#ctp:test:type:SoftLinkArray')
      .should('exist');
    // cy.get('#ctp:test:type:SoftLinkArray').should('exist');
    // cy.findByLabelText('SoftLinkArray definition').should('be.visible');
    cy.percySnapshot();
  });
});
