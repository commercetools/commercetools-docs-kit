import styled from '@emotion/styled';
import { colors, typography, dimensions } from '../../../design-system';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  color: ${colors.light.textSecondary};
  font-size: ${typography.fontSizes.h5};
  font-weight: ${typography.fontWeights.regular};
  white-space: nowrap;
  @media screen and (${dimensions.viewports.tablet}) {
    min-width: 9rem;
  }
`;
