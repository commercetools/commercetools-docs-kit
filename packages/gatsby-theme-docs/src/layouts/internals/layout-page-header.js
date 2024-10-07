import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import { GRID_ID_PAGE_HEADER } from './layout-design-config';

const LayoutPageHeader = styled.div`
  grid-area: ${GRID_ID_PAGE_HEADER};
  font-size: ${designSystem.typography.fontSizes.h3};
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
