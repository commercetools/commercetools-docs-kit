import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import ContentNotifications from './content-notifications';
import { dimensions } from '../design-system';

// Explanation about the following sizes:
// https://github.com/commercetools/commercetools-docs-kit/pull/427#discussion_r425442556
const cardNarrowMinWidth = '242px';
const cardRegularMinWidth = '328px';
const CardsContainer = styled.div`
  display: grid;
  gap: ${dimensions.spacings.m};
  grid-auto-columns: 1fr;
  grid-template-columns: ${(props) =>
    `repeat(auto-fill, minmax(${
      props.narrow ? cardNarrowMinWidth : cardRegularMinWidth
    }, 1fr))`};
`;

const flatStyle = css`
  border: 1px solid #cccccc;
`;

const clickableStyle = css`
  cursor: pointer;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.24),
    -1px 1px 3px 0 rgba(0, 0, 0, 0.12);
`;

const CardContainer = styled.div`
  ${(props) => (props.clickable ? clickableStyle : flatStyle)};
  background-color: #ffffff;
  padding: 16px;
  border-radius: 6px;
`;

export const Cards = (props) => {
  try {
    return (
      <CardsContainer {...props}>
        {React.Children.map(props.children, (child) => {
          if (!child.props || child.props.mdxType !== 'Card') {
            throw new Error(
              `Children of <Cards> must be a <Card> component and not "${
                child.props ? child.props.mdxType : child
              }"`
            );
          }
          return React.cloneElement(child, [props], [...child.props.children]);
        })}
      </CardsContainer>
    );
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      return (
        <ContentNotifications.Error>{e.message}</ContentNotifications.Error>
      );
    }

    throw e;
  }
};

Cards.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired),
    PropTypes.element.isRequired,
  ]).isRequired,
};

export const Card = (props) => {
  /**
   * todo: if clackable
   * - check for href, throw error if not present
   * - listen for onclick event
   */
  return <CardContainer {...props[0]}>{props.children}</CardContainer>;
};

Card.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
