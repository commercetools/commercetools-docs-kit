import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const SecondaryButton = styled.button`
  color: ${designSystem.colors.light.link};
  font-size: ${designSystem.typography.fontSizes.small};
  outline: none !important;
  cursor: pointer;
  border: none;
  background: transparent;

  :hover {
    color: ${designSystem.colors.light.linkHover};
  }
`;

export default SecondaryButton;
