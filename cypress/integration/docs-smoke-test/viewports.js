import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Viewports', () => {
  it('should take snapshots for mobile and tablet viewports', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    cy.findAllByText('Docs Smoke Test');
    // wait for menu button to appear
    cy.findByLabelText('Open Main Navigation');
    cy.percySnapshot(cy.state('runnable').fullTitle(), {
      widths: [512, 956],
    });
  });
  // Currently snapshots with scroll postion are not supported by Percy.
  // https://github.com/percy/percy-cypress/issues/2#issuecomment-533316240
  it.skip('should take snapshots of sticky page navigation', () => {
    cy.visit(URL_DOCS_SMOKE_TEST);
    cy.findByLabelText('Page Table of Contents Navigation').within(() => {
      cy.findByText('Last section').click();
      cy.percySnapshot(cy.state('runnable').fullTitle(), {
        percyCSS: `#application { height: 100vh !important; }`,
      });
    });
  });
});
