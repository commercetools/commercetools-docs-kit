import React from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import ContentNotifications from './content-notifications';
import RssFeedTable from './rss-feed-table';

// Inspired by https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/
async function parseRssFeed(url) {
  const response = await fetch(url);
  const rawBody = await response.text();
  const data = new window.DOMParser().parseFromString(rawBody, 'text/xml');

  const feedTitle = data.querySelector('title').firstChild.data;
  const items = Array.from(data.querySelectorAll('item')).map((el) => {
    const title = el.querySelector('title').firstChild.data;
    const description = el.querySelector('description').firstChild.data;
    const link = el.querySelector('link').firstChild.data;
    const pubDate = el.querySelector('pubDate').firstChild.data;
    return {
      title,
      description,
      link,
      pubDate,
    };
  });

  return { feedTitle, items };
}

async function fetcher(...args) {
  const promises = args.map(async (url) => {
    const releaseNoteUrl = url.replace(/\/feed.xml$/, '');
    const feedData = await parseRssFeed(url);
    const feedName = feedData.feedTitle.replace(
      /^commercetools (.*) Release Notes$/,
      '$1'
    );
    const refactoredData = feedData.items.map((item) => ({
      ...item,
      feedName,
      releaseNoteUrl,
    }));
    return refactoredData;
  });
  return Promise.all(promises);
}

export const transformData = (data) => {
  // First, we need to get the oldest release note from each feed,
  // which is always the last entry of the list.
  const lastEntryOfList = data
    .reduce((list, feed) => {
      return [...list, feed[feed.length - 1]];
    }, [])
    // After that, we need to compare the oldest release dates from each feed
    // to get the newest of them. This will be our last entry in the list.
    .reduce((currentOldestEntry, entry, index) => {
      if (index === 0) {
        return entry;
      }
      return new Date(entry.pubDate) > new Date(currentOldestEntry.pubDate)
        ? entry
        : currentOldestEntry;
    }, {});

  // After finding out the last entry in the list, we reduce the list
  // to all entries that have a newer date than our last entry.
  const tableData = data
    .flat()
    .reduce((list, entry) => {
      return new Date(entry.pubDate) >= new Date(lastEntryOfList.pubDate)
        ? [...list, entry]
        : [...list];
    }, [])
    // Now we sort the release notes after their release date.
    .sort((dateOne, dateTwo) => {
      return new Date(dateTwo.pubDate) - new Date(dateOne.pubDate);
    });
  return tableData;
};

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
    return (
      <RssFeedTable
        hasMultipleSources={props.dataSources.length > 1}
        data={transformData(data)}
      />
    );
  }
  return <LoadingSpinner size="s">{'Loading feeds'}</LoadingSpinner>;
};

RssFeeds.propTypes = {
  dataSources: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default RssFeeds;
