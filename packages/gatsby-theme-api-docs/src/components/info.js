import styled from '@emotion/styled';
import { colors, dimensions, typography } from '../design-system';

const Info = styled.span`
  display: inline-block;
  border: 1px solid ${colors.light.borderInfo};
  background-color: ${colors.light.surfaceInfo};
  padding: ${dimensions.spacings.xxs} ${dimensions.spacings.xs};
  font-size: ${typography.fontSizes.small};
`;

export default Info;
