import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Parser from 'rss-parser';
import moment from 'moment';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import ContentNotifications from './content-notifications';
import { colors, tokens, dimensions } from '../design-system';

const parser = new Parser();

const Table = styled.table`
  border-radius: ${tokens.borderRadiusForRssFeedTable};
  box-shadow: ${tokens.shadowForRssFeedTable};

  thead {
    background-color: ${colors.light.surfaceSecondary1};

    th {
      padding: ${dimensions.spacings.s};
    }
  }

  tbody {
    tr {
      td {
        padding: ${dimensions.spacings.m};

        :first-of-type {
          color: ${colors.light.linkHover};
        }
      }

      :not(:first-of-type) {
        border-top: 1px solid ${colors.light.borderPrimary};
      }
    }
  }
`;

const RssFeeds = (props) => {
  if (
    !props.feedUrls ||
    !Array.isArray(props.feedUrls) ||
    props.feedUrls.length < 1
  ) {
    const message =
      'Must pass prop feedUrls of an array type with at least 1 rss url to RssFeeds component.';
    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }

    throw new Error(message);
  }

  // eslint-disable-next-line
  const [feeds, setFeeds] = React.useState([]);
  // eslint-disable-next-line
  const [error, setError] = React.useState();

  // eslint-disable-next-line
  React.useEffect(() => {
    const feedsPromises = props.feedUrls.map(
      (url) =>
        new Promise((resolve, reject) => {
          parser.parseURL(url, (err, feed) => {
            if (err) {
              reject(err);
            }

            resolve(feed);
          });
        })
    );

    Promise.all(feedsPromises)
      .then((values) => {
        setFeeds(values);
      })
      .catch((e) => {
        console.log(e);
        setError(
          'Something went wrong with the request, make sure all urls are valid rss feeds'
        );
      });
  }, [props.feedUrls]);

  if (error) {
    return <ContentNotifications.Error>{error}</ContentNotifications.Error>;
  }

  return (
    <>
      {feeds.length < 1 ? (
        <LoadingSpinner size="s">{'Loading feeds'}</LoadingSpinner>
      ) : (
        <SpacingsStack scale="m">
          {feeds.map((feed) => (
            <Table key={feed.title}>
              <thead>
                <tr>
                  <th colSpan="2">{feed.title}</th>
                </tr>
              </thead>
              <tbody>
                {feed.items.map((item) => (
                  <tr key={item.title}>
                    <td>{moment(item.pubDate).format('D MMMM YYYY')}</td>
                    <td>{item.title}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ))}
        </SpacingsStack>
      )}
    </>
  );
};

RssFeeds.propTypes = {
  feedUrls: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default RssFeeds;
