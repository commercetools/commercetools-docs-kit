import React from 'react';
import useSWR from 'swr';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import ContentNotifications from './../content-notifications';
import RssFeedTable from './rss-feed-table';
import { buildReleaseNotesQueryString } from '@commercetools-docs/gatsby-theme-docs';

type RssFeed = {
  feedTitle: string;
  items: RssEntry[];
};
type RssEntry = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  productArea: string;
  product: string;
};
interface FlatRssEntry extends RssEntry {
  feedName: string;
  releaseNoteUrl: string;
}

const firstDataForQuery = (node: ParentNode, query: string) => {
  const firstChild = node.querySelector(query);
  return firstChild?.textContent?.trim();
};

// Inspired by https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/
const parseRssFeed = (rssString: string): RssFeed => {
  const documentFragment = new window.DOMParser().parseFromString(
    rssString,
    'text/xml'
  );
  const feedTitle = firstDataForQuery(documentFragment, 'title') || '';
  const items = Array.from(documentFragment.querySelectorAll('item')).map(
    (el) => {
      const title = firstDataForQuery(el, 'title') || '';
      const description = firstDataForQuery(el, 'description') || '';
      const productArea = firstDataForQuery(el, 'docs:productArea') || '';
      const product = firstDataForQuery(el, 'docs:product') || '';
      const link = firstDataForQuery(el, 'link') || '';
      const pubDate = firstDataForQuery(el, 'pubDate') || '';
      return {
        title,
        description,
        link,
        pubDate,
        productArea,
        product,
      };
    }
  );
  return { feedTitle, items };
};
const fetchRssFeed = async (url: string) => {
  const response = await fetch(url);
  const rawBody = await response.text();
  return parseRssFeed(rawBody);
};

const fetcher = async (url: string) => {
  const feedData = await fetchRssFeed(url);
  buildReleaseNotesQueryString();

  const refactoredData: FlatRssEntry[] = feedData.items.map((item) => ({
    ...item,
    feedName: item.productArea !== 'null' ? item.productArea : item.product,
    releaseNoteUrl: `/../docs/release-notes?${buildReleaseNotesQueryString(
      'product',
      item.product !== 'null' ? item.product : undefined,
      item.productArea !== 'null' ? item.productArea : undefined
    )}`,
  }));
  return refactoredData;
};

const RssFeeds = (props: RssFeedsProps) => {
  if (!props.dataSource) {
    const message = `Missing prop "dataSource" for the "<RssFeeds>" component.`;
    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }
    throw new Error(message);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(props.dataSource, fetcher);

  if (error) {
    console.log(error);
    const message = (
      <ContentNotifications.Error>
        Error Loading Data from {props.dataSource}
      </ContentNotifications.Error>
    );
    return message;
  }
  if (data) {
    return <RssFeedTable data={data} />;
  }
  return <LoadingSpinner scale="s">{'Loading feeds'}</LoadingSpinner>;
};

type RssFeedsProps = {
  dataSource: string;
};

export default RssFeeds;
export { parseRssFeed, fetchRssFeed, FlatRssEntry };
