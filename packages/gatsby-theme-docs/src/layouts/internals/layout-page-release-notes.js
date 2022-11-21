import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const LayoutPageReleaseNotes = styled.div`
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    max-width: unset;
    display: grid;
    grid:
      [row1-start] 'global-notification empty' auto [row1-end]
      [row2-start] 'page-header page-header-side' auto [row2-end]
      [row3-start] 'page-content page-navigation' 1fr [row3-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      0;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    grid:
      [row1-start] 'global-notification empty' auto [row1-end]
      [row2-start] 'page-header page-header-side' auto [row2-end]
      [row3-start] 'page-content page-navigation' 1fr [row3-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      ${designSystem.dimensions.widths.pageNavigationReleaseNotes};
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    grid:
      [row1-start] 'global-notification empty' auto [row1-end]
      [row2-start] 'page-header page-header-side' auto [row2-end]
      [row3-start] 'page-content page-navigation' 1fr [row3-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentSmallWithMargins},
        ${designSystem.dimensions.widths.pageContentWithMargins}
      )
      ${designSystem.dimensions.widths.pageNavigationReleaseNotes};
  }
  @media screen and (calc(${designSystem.dimensions.viewports
      .desktop} - 74px)) {
    grid:
      [row1-start] 'global-notification empty' auto [row1-end]
      [row2-start] 'page-header page-header-side' auto [row2-end]
      [row3-start] 'page-content page-navigation' 1fr [row3-end] /
      ${designSystem.dimensions.widths.pageContentWithMargins}
      ${designSystem.dimensions.widths.pageNavigationReleaseNotes};
  }
  ${(props) =>
    props.allowWideContentLayout
      ? `@media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    grid:
      [row1-start] 'global-notification empty' auto [row1-end]
      [row2-start] 'page-header page-header-side' auto [row2-end]
      [row3-start] 'page-content page-navigation' 1fr [row3-end]
      / minmax(
        ${designSystem.dimensions.widths.pageContentWideWithMargins},
        ${designSystem.dimensions.widths.pageContentWideWithMarginsMax}
      )
      minmax(${designSystem.dimensions.widths.pageNavigationSmall}, ${designSystem.dimensions.widths.pageNavigation});
  }`
      : ''}
`;

export default LayoutPageReleaseNotes;
