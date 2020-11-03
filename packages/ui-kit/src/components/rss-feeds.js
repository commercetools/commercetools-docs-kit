import React from 'react';
import useSWR from 'swr';
import Parser from 'rss-parser';
import PropTypes from 'prop-types';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import ContentNotifications from './content-notifications';
import RssFeedTable from './rss-feed-table';

async function fetcher(...args) {
  const rssParser = new Parser();
  const promises = args.map(async (feed) => {
    const feedData = await rssParser.parseURL(feed.url);
    const refactoredData = feedData.items.map((item) => {
      return { ...item, feedName: feed.title };
    });
    return refactoredData;
  });
  return Promise.all(promises);
}

const RssFeeds = (props) => {
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
    const oldestEntriesOfFeeds = data.reduce((list, feed) => {
      return [...list, feed[feed.length - 1]];
    }, []);

    // we use the newest of the oldest entry of each feed as the last entry in the release note list
    const lastEntryOfList = oldestEntriesOfFeeds.reduce(
      (currentOldestEntry, entry) => {
        return entry.pubDate > currentOldestEntry.pubDate
          ? entry
          : currentOldestEntry;
      }
    );

    const limitedEntries = data.flat().reduce((list, entry) => {
      return entry.pubDate >= lastEntryOfList.pubDate
        ? [...list, entry]
        : [...list];
    }, []);

    const tableData = limitedEntries.sort((dateOne, dateTwo) => {
      return new Date(dateTwo.pubDate) - new Date(dateOne.pubDate);
    });

    return <RssFeedTable data={tableData} />;
  }
  return <LoadingSpinner size="s">{'Loading feeds'}</LoadingSpinner>;
};

RssFeeds.propTypes = {
  dataSources: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RssFeeds;
