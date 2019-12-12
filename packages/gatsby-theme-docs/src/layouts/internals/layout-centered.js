import React from 'react';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

/* NOTE: `overflow` shorthand is only supported is Chrome and FF */
const Container = styled.div`
  position: relative;
  display: grid;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  grid-area: main;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid:
      [row1-start] 'center' auto [row1-end]
      / 100%;
    width: auto;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'left center right' auto [row1-end]
      / minmax(0, 100%) 1fr minmax(0, 100%);
    width: auto;
  }
`;
const EmptyLeft = styled.div`
  display: none;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid-area: left;
    display: block;
    background-color: ${designSystem.colors.light.surfaceSecondary1};
  }
`;
const EmptyRight = styled.div`
  display: none;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid-area: right;
    display: block;
  }
`;

const LayoutCentered = props => (
  <Container>
    <EmptyLeft />
    <EmptyRight />
    {// eslint-disable-next-line react/prop-types
    React.cloneElement(props.children, {
      style: { gridArea: 'center' },
    })}
  </Container>
);

export default LayoutCentered;
