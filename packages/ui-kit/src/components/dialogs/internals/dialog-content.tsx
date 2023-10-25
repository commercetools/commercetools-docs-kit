import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type DialogContentProps = {
  hideTopBorder?: boolean;
};

const getBorderCss = (props: DialogContentProps) => {
  if (!props.hideTopBorder) {
    return css`
      border-top: 1px solid ${designTokens.colorNeutral};
    `;
  }
  return ``;
};

// The overflow should be "auto", to make the container scrollable
const DialogContent = styled.div`
  ${(props: DialogContentProps) => getBorderCss(props)}
  padding-top: ${designTokens.spacingS};
  flex: 1;
  overflow: auto;
`;

export default DialogContent;
