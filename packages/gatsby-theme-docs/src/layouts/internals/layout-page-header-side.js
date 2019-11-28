import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

const LayoutPageHeaderSide = styled.div`
  grid-area: page-header-side;
  display: none;

  @media screen and (${dimensions.viewports.largeTablet}) {
    display: block;
    width: ${dimensions.widths.pageNavigation};
  }
  @media screen and (${dimensions.viewports.laptop}) {
    width: ${dimensions.widths.pageNavigationSmall};
  }
  @media screen and (${dimensions.viewports.desktop}) {
    width: ${dimensions.widths.pageNavigation};
  }
`;

export default LayoutPageHeaderSide;
