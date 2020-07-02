import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

// TODO allow "largeDesktop" width only if configured in the theme options.
// Should be possible via the site metadata hook or more CSS-ish means.

const LayoutPage = styled.div`
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    max-width: unset;
    display: grid;
    grid:
      [row1-start] 'page-header page-header-side' auto [row1-end]
      [row2-start] 'page-content page-navigation' 1fr [row2-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      0;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'page-header page-header-side' auto [row1-end]
      [row2-start] 'page-content page-navigation' 1fr [row2-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      ${designSystem.dimensions.widths.pageNavigation};
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'page-header page-header-side' auto [row1-end]
      [row2-start] 'page-content page-navigation' 1fr [row2-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      ${designSystem.dimensions.widths.pageNavigationSmall};
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    grid:
      [row1-start] 'page-header page-header-side' auto [row1-end]
      [row2-start] 'page-content page-navigation' 1fr [row2-end] /
      ${designSystem.dimensions.widths.pageContentWithMargins}
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, 1fr);
  }
  ${(props) =>
    props.allowWideContentLayout
      ? `@media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    grid:
      [row1-start] 'page-header page-header-side' auto [row1-end]
      [row2-start] 'page-content page-navigation' 1fr [row2-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentWideWithMargins},
        ${designSystem.dimensions.widths.pageContentWideWithMarginsMax}
      )
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, 1fr);
  }`
      : ''}
`;

export default LayoutPage;
