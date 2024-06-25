import { parseRssFeed } from './rss-feeds';
import { expect } from '@jest/globals';

const rawExampleFeed = `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:docs="http://docs.commercetools.com/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
<title>
<![CDATA[ commercetools RSS Feed ]]>
</title>
<link>https://docs.commercetools.com/</link>
<description>
<![CDATA[ commercetools RSS Feed ]]>
</description>
<lastBuildDate>Mon, 24 Jun 2024 12:55:00 GMT</lastBuildDate>
<language>
<![CDATA[ en ]]>
</language>
<category>
<![CDATA[ commercetools ]]>
</category>
<category>
<![CDATA[ e-commerce ]]>
</category>
<item>
<title>
<![CDATA[ title 1 cdata in own line ]]>
</title>
<description>
<![CDATA[ description 1. cdata directly in the tag ]]>
</description>
<link>https://docs.commercetools.com/api/releases/2022-01-27-example-1</link>
<docs:product>Composable Commerce</docs:product>
<docs:productArea>Merchant Center</docs:productArea>
<guid isPermaLink="false">https://docs.commercetools.com/api/releases/2022-01-27-example-1</guid>
<pubDate>Thu, 27 Jan 2022 00:00:00 GMT</pubDate>
</item>
</channel>
</rss>
`;

const parsedExampleFeed = {
  feedTitle: 'commercetools RSS Feed',
  items: [
    {
      title: 'title 1 cdata in own line',
      description: 'description 1. cdata directly in the tag',
      link: 'https://docs.commercetools.com/api/releases/2022-01-27-example-1',
      product: 'Composable Commerce',
      productArea: 'Merchant Center',
      pubDate: 'Thu, 27 Jan 2022 00:00:00 GMT',
    },
  ],
};

describe('parseRssString', () => {
  const parsedFeedData = parseRssFeed(rawExampleFeed);
  it('should match the test data', () => {
    expect(parsedFeedData).toEqual(parsedExampleFeed);
  });
});
