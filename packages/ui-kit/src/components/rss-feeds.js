import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import ContentNotifications from './content-notifications';

const RssFeeds = (props) => {
  const { feed, error } = useSWR(props.url);

  console.log(feed);

  if (error) {
    return <ContentNotifications.Error>{error}</ContentNotifications.Error>;
  }

  return <div>Feed: {JSON.stringify(feed)}</div>;
};

RssFeeds.propTypes = {
  url: PropTypes.string.isRequired,
};

export default RssFeeds;
