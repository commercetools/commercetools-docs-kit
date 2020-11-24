import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const LayoutPageHeaderSide = styled.aside`
  grid-area: page-header-side;
  display: none;
  padding: 0 ${designSystem.dimensions.spacings.m};
  margin: ${designSystem.dimensions.spacings.m} 0
    ${designSystem.dimensions.spacings.large} 0;
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
    width: calc(
      ${designSystem.dimensions.widths.pageNavigation} -
        ${designSystem.dimensions.spacings.m} * 2
    );
  }
  @media screen and (${designSystem.dimensions.viewports.laptop}) {
    width: calc(
      ${designSystem.dimensions.widths.pageNavigationSmall} -
        ${designSystem.dimensions.spacings.m} * 2
    );
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: calc(
      ${designSystem.dimensions.widths.pageNavigation} -
        ${designSystem.dimensions.spacings.m} * 2
    );
  }
`;

export default LayoutPageHeaderSide;
