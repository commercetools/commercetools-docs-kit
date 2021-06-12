import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { DocsDateFormat } from '@commercetools-docs/ui-kit';
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

const RssFeedTable = (props) => {
  if (!props.data) {
    const message = 'Must pass data to RssFeedTable component.';
    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }

    throw new Error(message);
  }

  return (
    <div>
      <Table>
        <tbody>
          {props.data.map((item, index) => (
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

RssFeedTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      pubDate: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      feedName: PropTypes.string.isRequired,
      releaseNoteUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  hasMultipleSources: PropTypes.bool.isRequired,
};

export default RssFeedTable;
