import styled from '@emotion/styled';
import { typography } from '../design-system';
import { TypographyContainer } from './markdown';

const Subtitle = styled(TypographyContainer)`
  font-size: ${typography.fontSizes.h3};
  max-width: 100% !important;
`;

export default Subtitle;
