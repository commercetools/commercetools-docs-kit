import React from 'react';
import PropTypes from 'prop-types';
import { ContentNotifications, cardElements } from '@commercetools-docs/ui-kit';

const Cards = (props) => {
  try {
    return (
      <cardElements.CardsContainer {...props} data-search-key="cards-container">
        {props.children}
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
};

Cards.propTypes = {
  clickable: PropTypes.bool,
  narrow: PropTypes.bool,
  fitContentColumn: PropTypes.bool,
  smallTitle: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Cards;
