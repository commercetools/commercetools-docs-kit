import React from 'react';
import PropTypes from 'prop-types';
import { ContentNotifications, cardElements } from '@commercetools-docs/ui-kit';

const Cards = (props) => {
  try {
    return (
      <cardElements.CardsContainer {...props} data-search-key="cards-container">
        {React.Children.map(props.children, (child) => {
          if (!React.isValidElement(child)) {
            throwErrorMessage(child);
          } else if (
            child.type.displayName === 'MDXCreateElement' &&
            child.props.mdxType !== 'Card'
          ) {
            // this is created in mdx but it is not a card
            throwErrorMessage(child.props.mdxType);
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
      </cardElements.CardsContainer>
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
