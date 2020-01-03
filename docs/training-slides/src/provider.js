import React from 'react';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';
import PropTypes from 'prop-types';
import { useDeck } from 'mdx-deck';

import { Reset, Globals, designSystem } from '@commercetools-docs/ui-kit';

const slideGlobalStyles = {
  '*': {
    overflow: 'hidden',
  },
  html: {
    background: 'black',
    fontSize: '1.668vw', // 2* 0,834 -> 960px "design"
    /* OLD: at 1920*1080 0.834vw equals 16px. This way the design can be done in pixels
although the actual font size will scale with the window because the html attribute has a vw (% of viewport width) based root font size set.
_all_ sizing in the implementation has to be implemented in rem units then, so that the complete design fluidly scales with window / projector size
To translate the pixel based design input, a pixel-to-rem helper can be used in the implementation. */
  },
};

const Canvas = styled.div({
  width: '100vw',
  height: '56.25vw' /* 16:9 Aspect Ratio */,
  display: 'grid',
  gridTemplateColumns: '1fr 15fr' /* 16 of the 16:9 aspect ratio */,
  gridTemplateRows: '8fr 1fr' /* 9 of the 16:9 aspect ratio */,
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
        <Content>{children}</Content>
      </Canvas>
    </>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Provider;
