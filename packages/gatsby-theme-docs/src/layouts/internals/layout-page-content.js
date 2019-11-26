import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

const LayoutPageContent = styled.div`
  grid-row: 2;
  grid-column: 1/3;
  padding: 0 ${dimensions.spacings.m} ${dimensions.spacings.xl};

  > * + * {
    margin: ${dimensions.spacings.xl} 0 0;
  }

  @media screen and (${dimensions.viewports.largeTablet}) {
    grid-column: 1;
  }
  @media screen and (${dimensions.viewports.desktop}) {
    padding: 0 ${dimensions.spacings.xl} ${dimensions.spacings.xl};
  }
`;

export default LayoutPageContent;
