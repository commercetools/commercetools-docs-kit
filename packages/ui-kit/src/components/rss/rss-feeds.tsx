import React from 'react';
import useSWR from 'swr';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import ContentNotifications from './../content-notifications';
import RssFeedTable from './rss-feed-table';

type RssFeed = {
  feedTitle: string;
  items: RssEntry[];
};
type RssEntry = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
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
      const link = firstDataForQuery(el, 'link') || '';
      const pubDate = firstDataForQuery(el, 'pubDate') || '';
      return {
        title,
        description,
        link,
        pubDate,
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

const fetcher = async (args: string[]) => {
  const promises = args.map(async (url) => {
    const releaseNoteUrl = url.replace(/\/feed.xml$/, '');
    const feedData = await fetchRssFeed(url);
    const feedName = feedData.feedTitle.replace(
      /^commercetools (.*) Release Notes$/,
      '$1'
    );
    const refactoredData: FlatRssEntry[] = feedData.items.map((item) => ({
      ...item,
      feedName,
      releaseNoteUrl,
    }));
    return refactoredData;
  });
  return Promise.all(promises);
};

const transformData = (data: FlatRssEntry[][]) => {
  // First, we need to get the oldest release note from each feed,
  // which is always the last entry of the list.
  const lastEntryOfList = data
    .reduce((list, feed) => {
      return [...list, feed[feed.length - 1]];
    }, [])
    // After that, we need to compare the oldest release dates from each feed
    // to get the newest of them. This will be our last entry in the list.
    .reduce<FlatRssEntry>(
      (
        currentOldestEntry: FlatRssEntry,
        entry: FlatRssEntry,
        index: number
      ) => {
        if (!entry || index === 0) {
          return entry;
        }
        return new Date(entry.pubDate) > new Date(currentOldestEntry.pubDate)
          ? entry
          : currentOldestEntry;
      },
      {} as FlatRssEntry
    );

  // After finding out the last entry in the list, we reduce the list
  // to all entries that have a newer date than our last entry.
  const tableData: FlatRssEntry[] = data
    .flat()
    .reduce<FlatRssEntry[]>((list, entry) => {
      return new Date(entry.pubDate) >= new Date(lastEntryOfList.pubDate)
        ? [...list, entry]
        : [...list];
    }, [])
    // Now we sort the release notes by their release date.
    .sort((dateOne, dateTwo) => {
      return (
        new Date(dateTwo.pubDate).getTime() -
        new Date(dateOne.pubDate).getTime()
      );
    });
  return tableData;
};

const RssFeeds = (props: RssFeedsProps) => {
  if (!props.dataSources) {
    const message = `Missing prop "dataSources" for the "<RssFeeds>" component.`;
    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }
    throw new Error(message);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(props.dataSources, fetcher);

  if (error) {
    console.log(error);
    const message = (
      <ContentNotifications.Error>
        Error Loading Data from {props.dataSources}
      </ContentNotifications.Error>
    );
    return message;
  }

  if (data) {
    return (
      <RssFeedTable
        hasMultipleSources={props.dataSources.length > 1}
        data={transformData(data)}
      />
    );
  }
  return <LoadingSpinner scale="s">{'Loading feeds'}</LoadingSpinner>;
};

type RssFeedsProps = {
  dataSources: string[];
};

export default RssFeeds;
export { transformData, parseRssFeed, fetchRssFeed, FlatRssEntry };
