import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

const LayoutPageHeader = styled.div`
  grid-row: 1;
  grid-column: 1;
  padding: ${dimensions.spacings.m} ${dimensions.spacings.m} 0;

  @media screen and (${dimensions.viewports.desktop}) {
    padding: ${dimensions.spacings.m} ${dimensions.spacings.xl} 0;
  }
`;

export default LayoutPageHeader;
