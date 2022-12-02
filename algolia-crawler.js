// This is a hardcopy of the Algolia crawler configuration for reference.
// The master lives on Algolias crawler servers and is also executed there.
// https://crawler.algolia.com/admin/crawlers/1b5189dd-f93c-43b7-8b45-e5ec6b0d319d/configuration/edit
/* eslint-disable */

new Crawler({
  appId: 'YOUR-APP-ID',
  apiKey: 'YOUR-API-KEY',
  rateLimit: 8,
  startUrls: ['https://docs.commercetools.com/'],
  renderJavaScript: false,
  sitemaps: [],
  exclusionPatterns: [
    '**/releases',
    '**/releases/**',
    '**.html',
    '**/**docs/removed-functionality**',
    '**/**docs/removed-functionality**/**',
  ],
  ignoreCanonicalTo: false,
  discoveryPatterns: ['https://docs.commercetools.com/**'],
  schedule: 'at 22:00 every weekday',
  actions: [
    {
      indexName: 'commercetools',
      pathsToMatch: ['https://docs.commercetools.com**/**'],
      recordExtractor: ({ $, helpers }) => {
        return helpers.docsearch({
          // FYI selector documentation: https://github.com/cheeriojs/cheerio#selectors
          recordProps: {
            lvl0: {
              selectors:
                $('meta[name=commercetools:title-for-onsite-search]').attr(
                  'content'
                ) || '#site-title',
              defaultValue: 'General Topics',
            },
            lvl1: 'article h1',
            lvl2: 'article h2',
            lvl3: ['article h3', 'article h4'], // an array is a list of fallbacks. Authors sometimes omit h3 to skip the side nav.
            lvl4: ['article h4', 'article h5'],
            content:
              // The following end up as individual "records", which is the best practice for long documents
              // https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/indexing-long-documents/

              // To test visually, paste this into the chrome inspector DOM search feature on
              // https://commercetools-docs-kit.vercel.app/docs-smoke-test/views/markdown#tables
              // navigate through the results and check for omissions or double matches
              // test other smoke test pages, too (e.g. cards, API docs)

              // General goal: Balance the algolia recommendation of a record per paragraph against
              //               excessive tokenization that negatively impacts the result preview and
              //               gets too near to the limit of 500 records per page.
              // Records:
              // - a paragraph / heading / lead paragraph
              // - a full list including sub-lists (ol, ul, dl)
              // - a full table (markdown or API type) - rows turned out to be too many
              // - a full blockquote
              // - an image caption
              // - cards are not structural, their h6 heading and paragraph indexed as content
              // Not Records (not indexed at all):
              // - code examples
              // - API docs: oauth scopes of endpoints, URL of endpoints, UI boilerplate
              '#body-content :not([data-search-key="embedded-api-description"]):not(li):not(dd):not(dt):not(td):not(blockquote) > p, #body-content h6, #body-content :not(li) > ul:not([data-search-key="cards-container"]), #body-content :not(li) > ol, #body-content :not(li) > blockquote, #body-content dl, #body-content figure, #body-content .lead, #body-content table',
          },
          indexHeadings: true,
        });
      },
    },
  ],
  initialIndexSettings: {
    commercetools: {
      attributesForFaceting: ['type', 'lang'],
      attributesToRetrieve: ['hierarchy', 'content', 'anchor', 'url'],
      attributesToHighlight: ['hierarchy', 'hierarchy_camel', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'hierarchy_radio', 'content'],
      searchableAttributes: [
        'unordered(hierarchy_radio_camel.lvl0)',
        'unordered(hierarchy_radio.lvl0)',
        'unordered(hierarchy_radio_camel.lvl1)',
        'unordered(hierarchy_radio.lvl1)',
        'unordered(hierarchy_radio_camel.lvl2)',
        'unordered(hierarchy_radio.lvl2)',
        'unordered(hierarchy_radio_camel.lvl3)',
        'unordered(hierarchy_radio.lvl3)',
        'unordered(hierarchy_radio_camel.lvl4)',
        'unordered(hierarchy_radio.lvl4)',
        'unordered(hierarchy_radio_camel.lvl5)',
        'unordered(hierarchy_radio.lvl5)',
        'unordered(hierarchy_radio_camel.lvl6)',
        'unordered(hierarchy_radio.lvl6)',
        'unordered(hierarchy_camel.lvl0)',
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy_camel.lvl1)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy_camel.lvl2)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy_camel.lvl3)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy_camel.lvl4)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy_camel.lvl5)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy_camel.lvl6)',
        'unordered(hierarchy.lvl6)',
        'content',
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: [
        'desc(weight.pageRank)',
        'desc(weight.level)',
        'asc(weight.position)',
      ],
      ranking: [
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'exact',
        'custom',
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
    },
  },
});
