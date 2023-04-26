import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const PrimaryButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${designSystem.dimensions.spacings.xs}
    ${designSystem.dimensions.spacings.m};
  gap: ${designSystem.dimensions.spacings.s};
  color: white;
  cursor: pointer;
  background: ${designSystem.colors.light.link};
  box-shadow: ${designSystem.tokens.shadowForBetaFlag};
  border-radius: 6px;

  p {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
`;

export default PrimaryButton;
