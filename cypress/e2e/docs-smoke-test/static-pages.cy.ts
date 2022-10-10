import { URL_DOCS_SMOKE_TEST } from '../../support/urls';
import { isCI } from '../../support/env';

if (isCI) {
  // NOTE: serving static HTML pages does not work in development mode.
  // https://github.com/gatsbyjs/gatsby/issues/13072
  describe('rendering static HTML pages', () => {
    it('/html/hello.html', () => {
      cy.visit(`${URL_DOCS_SMOKE_TEST}html/hello.html`);
      cy.findByText('Hello World!').should('exist');
    });
  });
}
