const processTableOfContentFields = require('./process-table-of-content-fields');

describe('processTableOfContentFields', () => {
  it('should remove jsx from titles and urls', () => {
    const tableOfContentBefore = {
      items: [
        {
          url: '#expected-usage',
          title: 'Expected Usage',
          items: [
            {
              url: '#in-markdown-document',
              title: 'In markdown document',
            },
            {
              url: '#generated-dom',
              title: 'Generated DOM',
            },
          ],
        },
        {
          url: '#with-children',
          title: 'With Children',
          items: [
            {
              url: '#in-markdown-document-1',
              title: 'In markdown document',
            },
            {
              url: '#generated-dom-1',
              title: 'Generated DOM',
            },
          ],
        },
        {
          url: '#in-a-title',
          title: 'In a title',
          items: [
            {
              url: '#anchor-in-title-links-here-anchor-nameany-html-id-compatible-string-in-a-title-',
              title:
                'Anchor in title links here <Anchor name="any-html-id-compatible-string-in-a-title" />',
            },
            {
              url: '#usage',
              title: 'Usage',
            },
          ],
        },
      ],
    };

    const tableOfContentAfter = {
      items: [
        {
          url: '#expected-usage',
          title: 'Expected Usage',
          items: [
            {
              url: '#in-markdown-document',
              title: 'In markdown document',
            },
            {
              url: '#generated-dom',
              title: 'Generated DOM',
            },
          ],
        },
        {
          url: '#with-children',
          title: 'With Children',
          items: [
            {
              url: '#in-markdown-document-1',
              title: 'In markdown document',
            },
            {
              url: '#generated-dom-1',
              title: 'Generated DOM',
            },
          ],
        },
        {
          url: '#in-a-title',
          title: 'In a title',
          items: [
            {
              url: '#anchor-in-title-links-here-',
              title: 'Anchor in title links here',
            },
            {
              url: '#usage',
              title: 'Usage',
            },
          ],
        },
      ],
    };

    expect(processTableOfContentFields(tableOfContentBefore)).toEqual(
      tableOfContentAfter
    );
  });
});
