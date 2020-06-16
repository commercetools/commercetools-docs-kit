import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import RssParser from 'rss-parser';
import ContentNotifications from './content-notifications';

async function fetcher(...args) {
  const rss = new RssParser();
  const feed = await rss.parseURL(args[0]);
  return feed;
}

const RssFeeds = (props) => {
  const { data, error } = useSWR(props.url, fetcher);
  if (error)
    return (
      <ContentNotifications.Error>
        Error Loading RSS feed from {props.url}
      </ContentNotifications.Error>
    );
  if (!data) return <div>loading...</div>;
  return (
    <ul>
      {data.items.map((item) => (
        <li key={item.guid}>
          <a href={item.link}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

RssFeeds.propTypes = {
  url: PropTypes.string.isRequired,
};

export default RssFeeds;
