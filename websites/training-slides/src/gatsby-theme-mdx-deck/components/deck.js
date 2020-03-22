import React from 'react';
import Deck from 'gatsby-theme-mdx-deck/src/components/deck';
import ctTheme from '../../theme';

const ThemedDeck = props => {
  return <Deck theme={ctTheme} {...props} />;
};

export default ThemedDeck;
