import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const LayoutReleaseNotePageHeaderSide = styled.aside`
  grid-area: page-header-side;
  display: none;
  padding: 0 ${designSystem.dimensions.spacings.m};
  margin: ${designSystem.dimensions.spacings.l} 0;
  border-left: 1px solid ${designSystem.colors.light.borderPrimary};

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    display: block;
  }
`;

export default LayoutReleaseNotePageHeaderSide;
