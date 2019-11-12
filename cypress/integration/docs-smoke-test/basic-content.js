import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

describe('Pagination', () => {
  const baseUrl = `${URL_DOCS_SMOKE_TEST}smoke-tests`;
  const links = [
    `${baseUrl}/text/`,
    `${baseUrl}/right-nav-submenu/`,
    `${baseUrl}/links/`,
    `${baseUrl}/links/link-target`,
    `${baseUrl}/lead-section/`,
    `${baseUrl}/table/`,
    `${baseUrl}/blockquotes/`,
    `${baseUrl}/horizontal-rule/`,
    `${baseUrl}/lists/`,
    `${baseUrl}/definition-lists/`,
    `${baseUrl}/empty-page/`,
    `${baseUrl}/page-with-little-content/`,
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
