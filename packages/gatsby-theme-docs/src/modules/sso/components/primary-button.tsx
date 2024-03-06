import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

type PrimaryButtonProps = {
  size?: string;
};

const PrimaryButton = styled.div<PrimaryButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${designSystem.dimensions.spacings.xs}
    ${designSystem.dimensions.spacings.m};
  gap: ${designSystem.dimensions.spacings.xs};
  color: white;
  cursor: pointer;
  height: ${(props) => (props.size === 'large' ? '40px' : '32px')};
  background: #227770;
  box-shadow: ${designSystem.tokens.shadowForBetaFlag};
  border-radius: 4px;

  p {
    font-size: ${designSystem.typography.fontSizes.small};
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
  }
`;

export default PrimaryButton;
