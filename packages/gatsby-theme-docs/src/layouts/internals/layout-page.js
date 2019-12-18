import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const LayoutPage = styled.div`
  display: block;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: grid;
    grid:
      [row1-start] 'header header' ${designSystem
        .dimensions.heights.header} [row1-end]
      [row2-start] 'page-header page-header-side' auto [row2-end]
      [row3-start] 'page-content page-navigation' 1fr [row3-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      0;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'header header' ${designSystem
        .dimensions.heights.header} [row1-end]
      [row2-start] 'page-header page-header-side' auto [row2-end]
      [row3-start] 'page-content page-navigation' 1fr [row3-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      ${designSystem.dimensions.widths.pageNavigation};
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'header header' ${designSystem
        .dimensions.heights.header} [row1-end]
      [row2-start] 'page-header page-header-side' auto [row2-end]
      [row3-start] 'page-content page-navigation' 1fr [row3-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargings},
        ${designSystem.dimensions.widths.pageContentWithMargings}
      )
      ${designSystem.dimensions.widths.pageNavigationSmall};
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'header header' ${designSystem
        .dimensions.heights.header} [row1-end]
      [row2-start] 'page-header page-header-side' auto [row2-end]
      [row3-start] 'page-content page-navigation' 1fr [row3-end]
      / ${designSystem.dimensions.widths.pageContentWithMargings}
      ${designSystem.dimensions.widths.pageNavigation};
  }
`;

export default LayoutPage;
