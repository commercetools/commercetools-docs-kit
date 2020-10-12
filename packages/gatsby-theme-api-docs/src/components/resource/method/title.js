import styled from '@emotion/styled';
import { typography, dimensions } from '../../../design-system';

export default styled.span`
  font-size: ${typography.fontSizes.h5};
  font-weight: ${typography.fontWeights.regular};
  white-space: nowrap;
  @media screen and (${dimensions.viewports.tablet}) {
    min-width: 9rem;
  }
`;
