import { URL_DOCS_SMOKE_TEST } from '../../support/urls';

const markdownPageUrl = `${URL_DOCS_SMOKE_TEST}views/markdown`;
console.log(URL_DOCS_SMOKE_TEST);

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
          cy.get('div').first().trigger('mouseover');
          cy.get('div')
            .eq(1)
            .get('div')
            .should('contain', 'Copy link to clipboard');
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
          cy.window()
            .its('navigator.clipboard')
            .invoke('readText')
            .then((clipboardText) =>
              expect(clipboardText.endsWith('views/markdown#a-header-section'))
            );
        });
    });
  });
});
