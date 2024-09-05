import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

const overridesPageUrl = `${URL_DOCS_SMOKE_TEST}views/overrides`;

describe('Site overrides', () => {
  beforeEach(() => {
    cy.visit(overridesPageUrl);
  });
  describe('when the page is rendered', () => {
    it('should render "Custom Site Title" as site title and custom link in the sidebar', () => {
      cy.get('span[id="site-title"]').contains('Custom Site Title');
      cy.get('span#site-title')
        .closest('a')
        .should('have.attr', 'href')
        .and('include', '/views/custom-anchor');
    });
    it('should render "Custom Site Title" as site title breadcrumb section', () => {
      cy.get('div[id="top-menu-switcher"] > div > span').contains(
        'Custom Site Title'
      );
    });
    it('should render "Custom Breadcrumb" as root breadcrumb', () => {
      cy.get('div[id="top-menu-switcher"] > div > div').contains(
        'Custom Breadcrumb'
      );
    });
  });
});
