import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const dimensions = designSystem.dimensions;
const LayoutPage = styled.div`
  @media screen and (${dimensions.viewports.tablet}) {
    max-width: unset;
    display: grid;
    grid:
      [row1-start] 'page-header page-header-side' auto [row1-end]
      [row2-start] 'page-content page-navigation' 1fr [row2-end]
      / minmax(
        ${dimensions.widths.pageContentSmallWithMargins},
        ${dimensions.widths.pageContentWithMargins}
      )
      0;
  }
  @media screen and (${dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'page-header page-header-side' auto [row1-end]
      [row2-start] 'page-content page-navigation' 1fr [row2-end]
      / minmax(
        ${dimensions.widths.pageContentSmallWithMargins},
        ${dimensions.widths.pageContentWithMargins}
      )
      ${dimensions.widths.pageNavigationSmall};
  }
  @media screen and (${dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'page-header page-header-side' auto [row1-end]
      [row2-start] 'page-content page-navigation' 1fr [row2-end]
      / minmax(
        ${dimensions.widths.pageContentSmallWithMargins},
        ${dimensions.widths.pageContentWithMargins}
      )
      ${dimensions.widths.pageNavigationSmall};
  }
  @media screen and (${dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'page-header page-header-side' auto [row1-end]
      [row2-start] 'page-content page-navigation' 1fr [row2-end] /
      ${dimensions.widths.pageContentWithMargins}
      minmax(
        ${dimensions.widths.pageNavigationSmall},
        ${dimensions.widths.pageNavigation}
      );
  }
  ${(props) =>
    props.allowWideContentLayout
      ? `@media screen and (${dimensions.viewports.largeDesktop}) {
    grid:
      [row1-start] 'page-header page-header-side' auto [row1-end]
      [row2-start] 'page-content page-navigation' 1fr [row2-end]
      / minmax(
        ${dimensions.widths.pageContentWideWithMargins},
        ${dimensions.widths.pageContentWideWithMarginsMax}
      )
      minmax(${dimensions.widths.pageNavigationSmall}, ${dimensions.widths.pageNavigation});
  }`
      : ''}
`;

export default LayoutPage;
