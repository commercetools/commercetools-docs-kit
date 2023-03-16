import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

const markdownPageUrl = `${URL_DOCS_SMOKE_TEST}views/markdown`;

describe('Sections', () => {
  beforeEach(() => {
    cy.visit(markdownPageUrl);
  });
  describe('when h2 header is rendered', () => {
    it('should render an adjacent "Copy link to clipboard" div', () => {
      cy.findAllByText('A section header')
        .first()
        .parents('h2')
        .first()
        .within(() => {
          // NOTE: testing for `mouseover` (for the tooltip) somehow
          // does not work, the event does not seem to be properly triggered.
          // Therefore, we only check for the tooltip content to be defined as `title`.
          cy.get('[title="Copy link to clipboard"]');
        });
    });
    it('should copy the header href location to the clipboard when clicked', () => {
      cy.findAllByText('A section header')
        .first()
        .parents('h2')
        .first()
        .within(() => {
          cy.get('div').first().trigger('mouseover');
          cy.get('div > div').first().click();
          cy.window().then((win) => {
            win.navigator.clipboard.readText().then((text) => {
              /* eslint-disable @typescript-eslint/no-unused-expressions */
              expect(text.endsWith('views/markdown#a-header-section')).to.be
                .true;
            });
          });
        });
    });
  });
});
