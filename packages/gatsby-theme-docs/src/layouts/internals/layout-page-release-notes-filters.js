import React from 'react';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const GridContainer = styled.div`
  display: none;
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
    grid-area: page-navigation;
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    width: ${designSystem.dimensions.widths.pageNavigationSmall};
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
`;
const StickyContainer = styled.div`
  position: sticky;
  top: ${designSystem.dimensions.spacings.xxl};
  margin: 0 0 ${designSystem.dimensions.spacings.s};
`;

// TODO: Filters
const LayoutPageReleaseNotesFilters = () => (
  <GridContainer>
    <StickyContainer></StickyContainer>
  </GridContainer>
);
LayoutPageReleaseNotesFilters.displayName = 'LayoutPageReleaseNotesFilters';

export default LayoutPageReleaseNotesFilters;
