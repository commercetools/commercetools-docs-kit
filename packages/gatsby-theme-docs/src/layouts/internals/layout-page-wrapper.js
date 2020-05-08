import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const LayoutPageWrapper = styled.article`
  grid-area: page;
  display: block;
  max-width: 100vw;
  box-shadow: ${designSystem.tokens.shadowForPageContent};
  z-index: 1;
`;

export default LayoutPageWrapper;
