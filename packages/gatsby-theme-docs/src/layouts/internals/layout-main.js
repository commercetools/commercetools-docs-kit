import React from 'react';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

/* NOTE: `overflow` shorthand is only supported is Chrome and FF */
const Wrapper = styled.div`
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
/* NOTE: `overflow` shorthand is only supported is Chrome and FF */
const Container = styled.div`
  display: grid;
  grid:
    [row1-start] 'page' 1fr [row1-end]
    / 1fr;
  overflow-x: hidden;
  overflow-y: auto;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid-area: center;
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'sidebar page' 1fr [row1-end]
      / auto 1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: calc(
      ${designSystem.dimensions.widths.pageContentWithMargings} +
        ${designSystem.dimensions.widths.pageNavigation} * 2
    );
  }
`;

const LayoutMain = props => (
  <Wrapper>
    <EmptyLeft />
    <EmptyRight />
    <Container {...props} />
  </Wrapper>
);

export default LayoutMain;
