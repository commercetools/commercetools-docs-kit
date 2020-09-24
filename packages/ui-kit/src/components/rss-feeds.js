import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import useSWR from 'swr';
import Parser from 'rss-parser';
import moment from 'moment';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import ContentNotifications from './content-notifications';
import { colors, tokens, dimensions } from '../design-system';
import Link from './link';

const Table = styled.table`
  width: 100%;
  border-radius: ${tokens.borderRadiusForRssFeedTable};
  box-shadow: ${tokens.shadowForRssFeedTable};

  thead {
    th {
      background-color: ${colors.light.surfaceSecondary2};
      border-radius: ${tokens.borderRadiusForRssFeedTable}
        ${tokens.borderRadiusForRssFeedTable} 0 0;
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

const DateWrapper = styled.span`
  white-space: nowrap;
`;

const RssFeeds = (props) => {
  if (!props.url) {
    const message = 'Must pass prop url to RssFeeds component.';
    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }

    throw new Error(message);
  }

  async function fetcher(...args) {
    const rssParser = new Parser();
    const feed = await rssParser.parseURL(args[0]);
    return feed;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(props.url, fetcher);

  if (error) {
    console.log(error);
    return (
      <ContentNotifications.Error>
        Error Loading RSS feed from {props.url}
      </ContentNotifications.Error>
    );
  }

  return (
    <div>
      {!data ? (
        <LoadingSpinner size="s">{'Loading feeds'}</LoadingSpinner>
      ) : (
        <Table>
          <thead>
            <tr>
              <th colSpan="2">{props.title ? props.title : data.title}</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={`${item.title}${index}`}>
                <td
                  css={css`
                    width: ${dimensions.widths.rssFeedDateWidth};
                  `}
                >
                  <DateWrapper>
                    <Link
                      href={item.link}
                      css={css`
                        text-decoration: none;
                      `}
                    >
                      {moment(item.pubDate).format('D MMMM YYYY')}
                    </Link>
                  </DateWrapper>
                </td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

RssFeeds.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default RssFeeds;
