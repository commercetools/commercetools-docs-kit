import React from 'react';
import PropTypes from 'prop-types';
import { ContentNotifications, cardElements } from '@commercetools-docs/ui-kit';

const Cards = (props) => {
  try {
    /**
     * We clone the children because we want to apply some of the props applied to the parent to each child.
     * In the markdown the props are defined only at parent level for simplicity.
     * The above implies that each child will have the same clickable, narrow and smallTitle prop as the one
     * applied to the parent.
     */
    const sanitizedChildren = React.Children.toArray(props.children).filter(
      (child) => React.isValidElement(child)
    );
    return (
      <cardElements.CardsContainer {...props} data-search-key="cards-container">
        {sanitizedChildren.map((child) => {
          if (child.type.displayName !== 'Card') {
            // this is created in mdx but it is not a card
            throwErrorMessage();
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

  function throwErrorMessage() {
    throw new Error(`Children of <Cards> must be a <Card> component`);
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
