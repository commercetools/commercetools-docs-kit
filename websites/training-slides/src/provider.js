import React from 'react';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';
import PropTypes from 'prop-types';
import { useDeck } from 'gatsby-theme-mdx-deck';

import { Reset, Globals, Markdown } from '@commercetools-docs/ui-kit';

import designSystem from './design-system';

const slideGlobalStyles = {
  overflow: 'hidden',
  html: {
    background: 'black',
    overflow: 'hidden',
    fontSize: designSystem.slideLayout.baseFontSize,
  },
};

const Canvas = styled.div({
  width: '100vw',
  height: designSystem.slideLayout.contentAreaHeight,
  display: 'grid',
  gridTemplateColumns: `${
    designSystem.slideLayout.sideBarElements
  }fr ${designSystem.slideLayout.horizontalElements -
    designSystem.slideLayout.sideBarElements}fr`,
  gridTemplateRows: `${designSystem.slideLayout.verticalElements - 1}fr 1fr`,
  gridGap: 0,
  fontFamily: `${designSystem.typography.fontFamilies.primary}`,
  fontSize: `${designSystem.typography.fontSizes.body}`,
  fontWeight: `${designSystem.typography.fontWeights.regular}`,
  lineHeight: 1.5,
});

const Corner = styled.div({
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 2,
  gridRowEnd: 3,
  background: 'darkgray',
  color: 'white',
  display: 'grid',
  fontSize: '1.5rem',
});

const CornerContent = styled.div({
  margin: 'auto',
});

const Sidebar = styled.div({
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: 2,
  writingMode: 'vertical-lr',
  transform: 'rotate(180deg)',
  padding: '0.5em',
  fontSize: '1.5em',
  background: 'lightgray',
});

const Content = styled.main`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  > div {
    /* override mdx-deck's dynamically set height and width */
    width: 100%;
    height: 100%;
  }
`;

const Provider = ({ children }) => {
  const state = useDeck(); // https://github.com/jxnblk/mdx-deck/blob/master/docs/api.md#usedeck
  return (
    <>
      <Reset />
      <Globals />
      <Global styles={slideGlobalStyles} />
      <Canvas>
        <Corner>
          <CornerContent>{state.index + 1}</CornerContent>
        </Corner>
        <Sidebar>Learning to Write</Sidebar>
        <Content>
          <Markdown.TypographyPage>{children}</Markdown.TypographyPage>
        </Content>
      </Canvas>
    </>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Provider;
