import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { DocsDateFormat } from '../utils/dates';
import Link from './link';
import ContentNotifications from './content-notifications';
import { colors, tokens, dimensions } from '../design-system';

const Table = styled.table`
  width: 100%;
  border-radius: ${tokens.borderRadiusForRssFeedTable};
  box-shadow: ${tokens.shadowForRssFeedTable};

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

const RssFeedTable = (props: RssReedTableProps) => {
  if (!props.data) {
    const message = 'Must pass data to RssFeedTable component.';
    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }

    throw new Error(message);
  }

  return (
    <div>
      <Table data-table-name="rss-feed">
        <tbody>
          {props.data.map((item: FeedEntry, index: number) => (
            <tr key={`${item.title}${index}`}>
              <td
                css={css`
                  white-space: nowrap;
                `}
              >
                <DateWrapper>
                  <Link
                    href={item.link}
                    css={css`
                      text-decoration: none;
                    `}
                  >
                    {DocsDateFormat.format(new Date(item.pubDate))}
                  </Link>
                </DateWrapper>
              </td>
              {props.hasMultipleSources ? (
                <td
                  css={css`
                    white-space: nowrap;
                    padding-left: ${dimensions.spacings.l} !important;
                  `}
                >
                  <Link
                    href={item.releaseNoteUrl}
                    css={css`
                      text-decoration: none;
                    `}
                  >
                    {item.feedName}
                  </Link>
                </td>
              ) : null}
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

type FeedEntry = {
  title: string;
  pubDate: string;
  link: string;
  feedName: string;
  releaseNoteUrl: string;
};
type RssReedTableProps = {
  data: FeedEntry[];
  hasMultipleSources: boolean;
};

export default RssFeedTable;
