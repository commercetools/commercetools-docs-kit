import React from 'react';
import type { SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { CloseIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

type Props = {
  title: string;
  onClose?: (event: SyntheticEvent) => void;
  children?: never;
};

type TitleProps = Pick<Props, 'title'>;
const Title = (props: TitleProps) => {
  return (
    <Text.Subheadline as="h4" title={props.title} truncate>
      {props.title}
    </Text.Subheadline>
  );
};

const DialogHeader = (props: Props) => (
  <div
    css={css`
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      margin-bottom: ${uiKitDesignTokens.spacingM};
    `}
  >
    <Spacings.Inline
      scale="m"
      alignItems="center"
      justifyContent="space-between"
    >
      {props?.title !== '' && <Title title={props.title} />}
      {props.onClose && (
        <SecondaryIconButton
          label="Close dialog"
          onClick={props.onClose}
          icon={<CloseIcon size="medium" />}
        />
      )}
    </Spacings.Inline>
  </div>
);
DialogHeader.displayName = 'DialogHeader';

export default DialogHeader;
