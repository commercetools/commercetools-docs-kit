import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Parser from 'rss-parser';
import moment from 'moment';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import ContentNotifications from './content-notifications';
import { colors, tokens, dimensions } from '../design-system';

const parser = new Parser();

const Table = styled.table`
  width: 100%;
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
  if (!props.url) {
    const message = 'Must pass prop url to RssFeeds component.';
    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }

    throw new Error(message);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [feed, setFeed] = React.useState(getFeedFromLocalStorage());
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = React.useState();

  // eslint-disable-next-line
  React.useEffect(() => {
    fetch(props.url)
      .then((response) => response.text())
      .then((str) => parser.parseString(str))
      .then((data) => {
        if (localStorage) {
          localStorage.setItem(`feeds-${props.url}`, JSON.stringify(data));
        }

        setFeed(data);
      })
      .catch((e) => {
        console.log(e);
        setError(
          'Something went wrong with the request, make sure all urls are valid rss feeds'
        );
      });
  }, [props.url]);

  if (error) {
    return <ContentNotifications.Error>{error}</ContentNotifications.Error>;
  }

  return (
    <div>
      {Object.keys(feed).length < 1 ? (
        <LoadingSpinner size="s">{'Loading feeds'}</LoadingSpinner>
      ) : (
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
      )}
    </div>
  );

  function getFeedFromLocalStorage() {
    if (localStorage) {
      return JSON.parse(localStorage.getItem(`feeds-${props.url}`)) || {};
    }

    return {};
  }
};

RssFeeds.propTypes = {
  url: PropTypes.string.isRequired,
};

export default RssFeeds;
