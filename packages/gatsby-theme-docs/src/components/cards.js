import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem, ContentNotifications } from '@commercetools-docs/ui-kit';

// Explanation about the following sizes:
// https://github.com/commercetools/commercetools-docs-kit/pull/427#discussion_r425442556
const cardNarrowMinWidth = '242px';
const cardRegularMinWidth = '328px';
const CardsContainer = styled.div`
  display: grid;
  gap: ${designSystem.dimensions.spacings.m};
  grid-auto-columns: 1fr;
  grid-template-columns: ${(props) =>
    `repeat(auto-fill, minmax(${
      props.narrow ? cardNarrowMinWidth : cardRegularMinWidth
    }, 1fr))`};
`;

const Cards = (props) => {
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

export default Cards;
