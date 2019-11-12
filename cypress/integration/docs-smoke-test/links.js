import { URL_DOCS_SMOKE_TEST } from '../../support/urls';
import { isCI } from '../../support/env';

const linksPageUrl = `${URL_DOCS_SMOKE_TEST}smoke-tests/links/`;

const scenarios = [
  {
    title: 'Link pointing to an empty string',
    expectationMessage: 'It renders a link to the same page',
    expected: {
      url: `${Cypress.config().baseUrl}${linksPageUrl}`,
    },
  },
  {
    title: 'Link pointing to a different website',
    expectationMessage:
      'It should work and be an OutboundLink that tracks via google analytics',
    linkSelector: () => {
      // See how to test external domains: https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__tab-handling-links/cypress/integration/tab_handling_anchor_links_spec.js
      cy.get('a')
        .contains('Link')
        .parents('a')
        .first()
        .should('have.prop', 'href', 'https://commercetools.com/')
        .should('have.prop', 'target', '_blank');
    },
    expected: {},
  },
  {
    title: 'Link to a heading anchor on this page',
    expectationMessage:
      'It should jump to that position without visible scrolling or reload',
    expected: {
      hash: '#last-heading',
      url: `${Cypress.config().baseUrl}${linksPageUrl}`,
      urlMatcher: 'include',
    },
  },
  {
    title:
      'Link to a heading anchor on this same page, but using the full path',
    expectationMessage:
      'It should jump to that position without visible scrolling or reload',
    expected: {
      hash: '#last-heading',
      url: `${Cypress.config().baseUrl}${linksPageUrl}`,
      urlMatcher: 'include',
    },
  },
  {
    title: 'Link to another page on this site, but using an absolute URL',
    expectationMessage:
      'It should render an absolute URL in dev mode and a relative path in prod mode',
    ...(isCI
      ? {
          expected: {
            url: `${
              Cypress.config().baseUrl
            }${URL_DOCS_SMOKE_TEST}code-samples/code-block/`,
          },
        }
      : {
          linkSelector: () => {
            cy.get('a')
              .contains('Link')
              .should(
                'have.prop',
                'href',
                'https://docs.commercetools.com/docs-smoke-test/code-block/'
              );
          },
          expected: {},
        }),
  },
  {
    title: 'Link to another page on this site using a full path',
    expectationMessage: 'It should be a Gatsby link, history navigation',
    expected: {
      url: `${
        Cypress.config().baseUrl
      }${URL_DOCS_SMOKE_TEST}code-samples/code-block/`,
    },
  },
  {
    title:
      'Link to another page on this site with a specific anchor a page on this site',
    expectationMessage:
      'It should be a Gatsby link, history navigation, and directly jump to the anchor element position',
    expected: {
      hash: '#linked-from-links',
      url: `${Cypress.config().baseUrl}/`,
      urlMatcher: 'include',
    },
  },
  {
    title:
      'Link to another page on this site using a relative upwards traversal path',
    expectationMessage:
      'It should be a Gatsby link, history navigation, to a parent folder',
    expected: {
      url: `${Cypress.config().baseUrl}${URL_DOCS_SMOKE_TEST}smoke-tests/`,
    },
  },
  {
    title: 'Link to a sub-page of this one (omitting the trailing slash)',
    expectationMessage:
      'It should be a Gatsby link, history navigation, to a sub folder',
    expected: {
      url: `${Cypress.config().baseUrl}${linksPageUrl}link-target/`,
    },
  },
  {
    title: 'Link to a sub-page of this one (including the trailing slash)',
    expectationMessage:
      'It should be a Gatsby link, history navigation, to a sub folder',
    expected: {
      url: `${Cypress.config().baseUrl}${linksPageUrl}link-target/`,
    },
  },
  {
    title:
      'Link to a page of another internal site using a full url (recommended)',
    expectationMessage:
      'It should be a normal html link (only in `production` mode)',
    linkSelector: () => {
      cy.get('a')
        .contains('Link')
        .should(
          'have.prop',
          'href',
          isCI
            ? `${Cypress.config().baseUrl}/another-site/welcome/`
            : 'https://docs.commercetools.com/another-site/welcome/'
        );
    },
    expected: {},
  },
  {
    title: 'Link to a page of another internal site',
    expectationMessage:
      'It should be a normal html link (only in `production` mode)',
    linkSelector: () => {
      cy.get('a')
        .contains('Link')
        .should('have.prop', 'href', `${Cypress.config().baseUrl}/import-api/`);
    },
    expected: {},
  },
];

describe('Links', () => {
  beforeEach(() => {
    cy.visit(linksPageUrl);
  });
  scenarios.forEach(scenario => {
    describe(scenario.title, () => {
      it(scenario.expectationMessage, () => {
        cy.findAllByText(scenario.title)
          .first()
          .parents('section')
          .first()
          .within(() => {
            if (scenario.linkSelector) {
              scenario.linkSelector();
            } else {
              cy.get('a')
                .contains('Link')
                .click();
            }
          });
        if (scenario.expected.url) {
          cy.url().should(
            scenario.expected.urlMatcher || 'eq',
            scenario.expected.url
          );
        }
      });
    });
  });
});
