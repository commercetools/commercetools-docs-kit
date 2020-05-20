import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem, ContentNotifications } from '@commercetools-docs/ui-kit';

// Explanation about the following sizes:
// https://github.com/commercetools/commercetools-docs-kit/pull/427#discussion_r425442556
// the "inContentColumn" variation prevents only one card being in one row in regular content (except mobile)
const cardNarrowMinWidth = '242px';
const cardRegularMinWidth = '328px';
const cardRegularMinWidthInContentColumn = '288px';
const CardsContainer = styled.ul`
  list-style: none;
  display: grid;
  gap: ${designSystem.dimensions.spacings.m};
  grid-auto-columns: 1fr;
  grid-template-columns: ${(props) => {
    const regularMinWidth = props.fitContentColumn
      ? cardRegularMinWidthInContentColumn
      : cardRegularMinWidth;
    const minWidth = props.narrow ? cardNarrowMinWidth : regularMinWidth;
    return `repeat( auto-fill, minmax(${minWidth}, 1fr)) `;
  }};
`;

const Cards = (props) => {
  try {
    return (
      <CardsContainer {...props}>
        {React.Children.map(props.children, (child) => {
          if (!React.isValidElement(child)) {
            throwErrorMessage(child);
          } else if (
            child.type.displayName === 'MDXCreateElement' &&
            child.props.mdxType !== 'Card'
          ) {
            // this is created in mdx but it is not a card
            throwErrorMessage(child.props.mdxType);
          } else if (
            child.type.displayName !== 'MDXCreateElement' &&
            child.type.name !== 'Card'
          ) {
            // this is not created in mdx but it is not a card
            throwErrorMessage(child.type.name);
          }

          return React.cloneElement(
            child,
            {
              clickable: props.clickable,
              narrow: props.narrow,
              smallTitle: props.smallTitle,
            },
            child.props.children
          );
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

  function throwErrorMessage(type) {
    throw new Error(
      `Children of <Cards> must be a <Card> component and not "${type}"`
    );
  }
};

Cards.propTypes = {
  clickable: PropTypes.bool,
  narrow: PropTypes.bool,
  fitContentColumn: PropTypes.bool,
  smallTitle: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Cards;
