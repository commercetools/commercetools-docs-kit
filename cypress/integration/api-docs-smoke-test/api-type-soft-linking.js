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
     *  - check if url is as expected
     *  - check if element with expected id exists
     *  - in this case the id should be ctp-test-type-softlinkarray
     */
    const typeElementId = 'ctp-test-type-softlinkarray';
    cy.url().should(
      'eq',
      `${
        Cypress.config().baseUrl
      }${URL_API_DOCS_SMOKE_TEST}e2e-tests/soft-linking-second-page#${typeElementId}`
    );
    cy.get('#body-content').find(`#${typeElementId}`).should('exist');
    cy.percySnapshot();
  });
});
