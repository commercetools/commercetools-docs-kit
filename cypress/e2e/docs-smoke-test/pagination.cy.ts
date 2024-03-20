import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Pagination', () => {
  const baseUrl = `${URL_DOCS_SMOKE_TEST}views`;
  const links = [
    `${baseUrl}/markdown`,
    `${baseUrl}/empty`,
    `${baseUrl}/beta`,
    `${baseUrl}/plan-tag`,
    `${baseUrl}/nested-headings`,
    `${baseUrl}/two-level-index-nav`,
    `${baseUrl}/links`,
    // TODO: Find out why the next link keeps failing.
    // `${baseUrl}/code-blocks`,
    // `${baseUrl}/code-examples`,
    // `${baseUrl}/custom-anchor`,
    // `${baseUrl}/wide`,
  ];
  links.forEach((url, index) => {
    const nextUrl = links[index + 1];
    it(`should render page ${url}, then go to next page`, () => {
      cy.visit(url);
      if (nextUrl) {
        cy.findByText('Next:').should('exist');
        cy.findByText('Next:').click();
        cy.url().should('include', nextUrl);
      }
    });
  });
});
