import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { designSystem } from '@commercetools-docs/ui-kit';

const baseStyles = css`
  font-weight: ${designSystem.typography.fontWeights.bold};
  line-height: ${designSystem.typography.lineHeights.releaseNoteHeader};
  font-size: ${designSystem.typography.fontSizes.h3};
  color: unset;
`;

const H1 = styled.h1`
  ${baseStyles};
  margin: ${designSystem.dimensions.spacings.l} 0 0 !important;
`;

const H3 = styled.h3`
  ${baseStyles};
  margin: ${designSystem.dimensions.spacings.huge} 0 0;
`;

export { H1, H3 };
