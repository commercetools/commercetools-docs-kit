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
                    {moment(item.pubDate).format('D MMMM YYYY')}
                  </Link>
                </DateWrapper>
              </td>
              <td
                css={css`
                  white-space: nowrap;
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
      feedName: PropTypes.string.isRequired,
      releaseNoteUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RssFeedTable;
