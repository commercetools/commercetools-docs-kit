import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import { GRID_ID_PAGE_HEADER_SIDE } from './internals/layout-design-config';

const LayoutReleaseNotePageHeaderSide = styled.aside`
  grid-area: ${GRID_ID_PAGE_HEADER_SIDE};
  display: none;
  padding: 0 ${designSystem.dimensions.spacings.m};
  margin: ${designSystem.dimensions.spacings.l} 0;
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
  }
`;

export default LayoutReleaseNotePageHeaderSide;
