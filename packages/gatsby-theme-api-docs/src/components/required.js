import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import { dimensions } from '../design-system';

export default styled.span`
  color: ${designSystem.colors.light.textWarning};
  font-size: ${designSystem.typography.fontSizes.small};
  margin-left: ${dimensions.spacings.xxs};
`;
