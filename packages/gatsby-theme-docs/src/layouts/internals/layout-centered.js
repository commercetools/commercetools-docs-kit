import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colors, dimensions } from '../../design-system';

const Container = styled.div`
  position: relative;
  display: block;
  width: 100vw;
  overflow: hidden auto;
  grid-area: main;

  @media screen and (${dimensions.viewports.desktop}) {
    display: grid;
    grid:
      [row1-start] 'left center right' auto [row1-end]
      / minmax(0, 100%) 1fr minmax(0, 100%);
    width: auto;
  }
`;

const LayoutCentered = props => (
  <Container>
    <div
      css={css`
        grid-area: left;
        background-color: ${colors.light.surfaceSecondary1};
      `}
    />
    <div
      css={css`
        grid-area: right;
      `}
    />
    {// eslint-disable-next-line react/prop-types
    React.cloneElement(props.children, {
      style: { gridArea: 'center' },
    })}
  </Container>
);

export default LayoutCentered;
