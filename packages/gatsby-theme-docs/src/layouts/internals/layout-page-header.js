import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const LayoutPageHeader = styled.div`
  grid-area: page-header;
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m} 0;

  > * + * {
    margin: ${designSystem.dimensions.spacings.m} 0 0 !important;
  }

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    padding: ${designSystem.dimensions.spacings.m}
      ${designSystem.dimensions.spacings.xl} 0;
  }
`;

export default LayoutPageHeader;
