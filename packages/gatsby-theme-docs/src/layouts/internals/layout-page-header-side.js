import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const LayoutPageHeaderSide = styled.aside`
  grid-area: page-header-side;
  display: none;
  padding-left: ${designSystem.dimensions.spacings.m};
  margin: ${designSystem.dimensions.spacings.m} 0
    ${designSystem.dimensions.spacings.xl} 0;
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    width: ${designSystem.dimensions.widths.pageHeaderSideSmall};
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: ${designSystem.dimensions.widths.pageNavigation};
  }
`;

export default LayoutPageHeaderSide;
