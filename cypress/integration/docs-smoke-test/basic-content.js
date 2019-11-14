import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Pagination', () => {
  const baseUrl = `${URL_DOCS_SMOKE_TEST}components`;
  const links = [
    `${baseUrl}/code-blocks`,
    `${baseUrl}/content-notifications`,
    `${baseUrl}/images`,
    `${baseUrl}/links`,
  ];
  links.forEach((url, index) => {
    const nextUrl = links[index + 1];
    it(`should render page ${url}, then go to next page`, () => {
      cy.setDesktopViewport();
      cy.visit(url);
      if (nextUrl) {
        cy.findByText('Next:').should('exist');
        cy.findByText('Next:').click();
        cy.url().should('include', nextUrl);
      }
    });
  });
});
