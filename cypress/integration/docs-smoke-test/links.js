import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

const linksPageUrl = `${URL_DOCS_SMOKE_TEST}/smoke-tests/links`;

describe('Links', () => {
  beforeEach(() => {
    cy.visit(linksPageUrl);
  });
  describe('Link pointing to an empty string', () => {
    it('should stay on the same page', () => {
      cy.findByText('Link pointing to an empty string')
        .parent('section')
        .within(() => {
          cy.get('a').click();
        });
      cy.url().should('be', linksPageUrl);
    });
  });
});
