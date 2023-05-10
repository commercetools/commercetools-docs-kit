import { URL_API_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Performance test on very long page', () => {
  it('measures loading time of the page', () => {
    cy.visit(`${URL_API_DOCS_SMOKE_TEST}docs-replications/long-page`, {
      onBeforeLoad: (win) => {
        win.performance.mark('start-loading');
      },
    })
      .its('performance')
      .then((performance) => {
        cy.get('body')
          .should('have.text', 'DocumentationAPI')
          .then(() => performance.mark('end-loading'))
          .then(() => {
            performance.measure('pageLoad', 'start-loading', 'end-loading');
            const measure = performance.getEntriesByName('pageLoad')[0];
            // This is the total amount of time (in milliseconds) between the start and end
            const duration = measure.duration;
            assert.isAtMost(duration, 5000);
          });
      });
  });
});
