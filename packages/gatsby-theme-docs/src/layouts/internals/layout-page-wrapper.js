import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const LayoutPageWrapper = styled.article`
  display: block;
  max-width: 100vw;
  box-shadow: ${designSystem.tokens.shadowForPageContent};
  z-index: ${designSystem.dimensions.stacks.base};
`;

export default LayoutPageWrapper;
