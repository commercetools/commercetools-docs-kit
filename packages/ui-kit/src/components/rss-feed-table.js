import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import moment from 'moment';
import Link from './link';
import ContentNotifications from './content-notifications';
import { colors, tokens, dimensions } from '../design-system';

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
        <thead>
          <tr>
            <th colSpan="3">Release Notes</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
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
              <td
                css={css`
                  width: ${dimensions.widths.rssFeedTitleWidth};
                `}
              >
                {item.feedName}
              </td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

RssFeedTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RssFeedTable;
