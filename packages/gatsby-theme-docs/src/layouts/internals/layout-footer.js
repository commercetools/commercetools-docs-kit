import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designSystem } from '@commercetools-docs/ui-kit';
import Footer from './footer';
const ContentGrid = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  grid:
    [row1-start] 'footer-main' 1fr [row1-end]
    / 1fr;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid:
      [row1-start] 'footer-main footer-right-blank' 1fr [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'footer-main footer-right-blank' 1fr [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'footer-main footer-right-blank' 1fr [row1-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, 1fr);
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'footer-main footer-right-blank' 1fr [row1-end]
      / ${designSystem.dimensions.widths.pageContentWithMargins}
      minmax(${designSystem.dimensions.widths.pageNavigation}, 1fr);
  }
`;
const RightBlank = styled.div`
  grid-area: right-blank;
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
  }
`;

const LayoutFooter = () => (
  <div
    css={css`
      grid-area: footer;
    `}
  >
    <footer>
      <ContentGrid>
        <Footer />
        <RightBlank />
      </ContentGrid>
    </footer>
  </div>
);

export default LayoutFooter;
