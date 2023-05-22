import { transformData, parseRssFeed, type FlatRssEntry } from './rss-feeds';
import { expect } from '@jest/globals';

describe('transformData', () => {
  const data = createTestData();
  const transformedData = transformData(data);

  it('should limit the items with the newest of the oldest feed dates', () => {
    expect(transformedData[transformedData.length - 1].pubDate).toBe(
      'Mon, 19 Oct 2020 00:00:00 GMT'
    );
  });
  it('should show only items with a newer date sorted', () => {
    expect(transformedData[0].pubDate).toBe('Mon, 02 Nov 2020 00:00:00 GMT');
    expect(transformedData[1].pubDate).toBe('Sun, 01 Nov 2020 00:00:00 GMT');
    expect(transformedData[2].pubDate).toBe('Tue, 29 Oct 2020 00:00:00 GMT');
    expect(transformedData[3].pubDate).toBe('Fri, 23 Oct 2020 00:00:00 GMT');
    expect(transformedData[4].pubDate).toBe('Mon, 19 Oct 2020 00:00:00 GMT');
  });
});

const rawExampleFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>
      <![CDATA[commercetools HTTP API Release Notes]]>
    </title>
    <description>
      <![CDATA[commercetools HTTP API Release Notes]]>
    </description>
    <link>https://docs.commercetools.com/api</link>
    <generator>GatsbyJS</generator>
    <lastBuildDate>Thu, 27 Jan 2022 20:27:31 GMT</lastBuildDate>
    <language>
      <![CDATA[en]]>
    </language>
    <category>
      <![CDATA[commercetools]]>
    </category>
    <category>
      <![CDATA[e-commerce]]>
    </category>
    <item>
      <title>
        <![CDATA[title 1 cdata in own line]]>
      </title>
      <description><![CDATA[description 1. cdata directly in the tag]]></description>
      <link>https://docs.commercetools.com/api/releases/2022-01-27-example-1</link>
      <guid isPermaLink="false">https://docs.commercetools.com/api/releases/2022-01-27-example-1</guid>
      <category>
        <![CDATA[Orders]]>
      </category>
      <category>
        <![CDATA[Messages]]>
      </category>
      <pubDate>Thu, 27 Jan 2022 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title>title 2. not cdata</title>
      <description>description 2. not cdata</description>
      <link>https://docs.commercetools.com/api/releases/2022-01-26-example-2</link>
      <guid isPermaLink="false">https://docs.commercetools.com/api/releases/2022-01-26-example-2</guid>
      <category>
        <![CDATA[Customers]]>
      </category>
      <category>
        <![CDATA[Limits]]>
      </category>
      <pubDate>Wed, 26 Jan 2022 00:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>
`;

const parsedExampleFeed = {
  feedTitle: 'commercetools HTTP API Release Notes',
  items: [
    {
      title: 'title 1 cdata in own line',
      description: 'description 1. cdata directly in the tag',
      link: 'https://docs.commercetools.com/api/releases/2022-01-27-example-1',
      pubDate: 'Thu, 27 Jan 2022 00:00:00 GMT',
    },
    {
      title: 'title 2. not cdata',
      description: 'description 2. not cdata',
      link: 'https://docs.commercetools.com/api/releases/2022-01-26-example-2',
      pubDate: 'Wed, 26 Jan 2022 00:00:00 GMT',
    },
  ],
};

describe('parseRssString', () => {
  const parsedFeedData = parseRssFeed(rawExampleFeed);
  it('should match the test data', () => {
    expect(parsedFeedData).toEqual(parsedExampleFeed);
  });
});

function createTestData(): FlatRssEntry[][] {
  return [
    [
      {
        feedName: 'HTTP API',
        title: 'description',
        pubDate: 'Mon, 02 Nov 2020 00:00:00 GMT',
        releaseNoteUrl: 'https://docs.commercetools.com/api/releases',
        description: '',
        link: 'https://example.com/1',
      },
      {
        feedName: 'HTTP API',
        title: 'description',
        pubDate: 'Sun, 01 Nov 2020 00:00:00 GMT',
        releaseNoteUrl: 'https://docs.commercetools.com/api/releases',
        description: '',
        link: 'https://example.com/2',
      },
      {
        feedName: 'HTTP API',
        title: 'description',
        pubDate: 'Mon, 19 Oct 2020 00:00:00 GMT',
        releaseNoteUrl: 'https://docs.commercetools.com/api/releases',
        description: '',
        link: 'https://example.com/3',
      },
    ],
    [
      {
        feedName: 'Merchant Center',
        title: 'description',
        pubDate: 'Fri, 23 Oct 2020 00:00:00 GMT',
        releaseNoteUrl:
          'https://docs.commercetools.com/merchant-center/releases',
        description: '',
        link: 'https://example.com/4',
      },
      {
        feedName: 'Merchant Center',
        title: 'description',
        pubDate: 'Tue, 06 Oct 2020 00:00:00 GMT',
        releaseNoteUrl:
          'https://docs.commercetools.com/merchant-center/releases',
        description: '',
        link: 'https://example.com/5',
      },

      {
        feedName: 'Merchant Center',
        title: 'description',
        pubDate: 'Tue, 08 Sep 2020 00:00:00 GMT',
        releaseNoteUrl:
          'https://docs.commercetools.com/merchant-center/releases',
        description: '',
        link: 'https://example.com/6',
      },
    ],
    [
      {
        feedName: 'Custom Applications',
        title: 'description',
        pubDate: 'Tue, 29 Oct 2020 00:00:00 GMT',
        releaseNoteUrl:
          'https://docs.commercetools.com/custom-applications/releases',
        description: '',
        link: 'https://example.com/7',
      },
      {
        feedName: 'Custom Applications',
        title: 'description',
        pubDate: 'Fri, 25 Sep 2020 00:00:00 GMT',
        releaseNoteUrl:
          'https://docs.commercetools.com/custom-applications/releases',
        description: '',
        link: 'https://example.com/8',
      },
    ],
    [
      {
        feedName: 'Import API',
        title: 'description',
        pubDate: 'Mon, 07 Sep 2020 00:00:00 GMT',
        releaseNoteUrl: 'https://docs.commercetools.com/import-api/releases',
        description: '',
        link: 'https://example.com/9',
      },
    ],
  ];
}
