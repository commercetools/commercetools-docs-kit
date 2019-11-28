import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

const LayoutPageHeader = styled.div`
  grid-area: page-header;
  padding: ${dimensions.spacings.m} ${dimensions.spacings.m} 0;

  > * + * {
    margin: ${dimensions.spacings.m} 0 0 !important;
  }

  @media screen and (${dimensions.viewports.desktop}) {
    padding: ${dimensions.spacings.m} ${dimensions.spacings.xl} 0;
  }
`;

export default LayoutPageHeader;
