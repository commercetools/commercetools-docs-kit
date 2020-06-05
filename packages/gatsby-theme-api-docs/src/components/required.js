import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import { dimensions } from '../design-system';

export default styled.span`
  color: ${designSystem.colors.light.textWarning};
  font-size: ${designSystem.typography.fontSizes.small};
  font-weight: ${designSystem.typography.fontWeights.bold};
  margin: 0 ${dimensions.spacings.xs};
  ::after {
    content: '*';
  }
`;
