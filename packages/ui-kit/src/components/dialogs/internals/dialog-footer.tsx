import React from 'react';
import type { ReactElement, SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import { designTokens } from '@commercetools-uikit/design-system';
import omitBy from 'lodash.omitby';

function filterDataAttributes<T extends object>(obj: T) {
  return omitBy<T>(obj, (_value, key) => !key.startsWith('data-'));
}

type Props = {
  labelSecondary: string;
  labelPrimary: string;
  onCancel?: (event: SyntheticEvent) => void;
  onConfirm: (event: SyntheticEvent) => void;
  isPrimaryButtonDisabled: boolean;
  dataAttributesPrimaryButton: { [key: string]: string };
  dataAttributesSecondaryButton: { [key: string]: string };
  children?: never;
  iconLeftSecondaryButton?: ReactElement;
  displaySecondaryButton?: boolean;
};
const defaultProps: Pick<
  Props,
  | 'isPrimaryButtonDisabled'
  | 'dataAttributesPrimaryButton'
  | 'dataAttributesSecondaryButton'
> = {
  isPrimaryButtonDisabled: false,
  dataAttributesPrimaryButton: {},
  dataAttributesSecondaryButton: {},
};

const DialogFooter = (props: Props) => {
  return (
    <div
      css={css`
        margin-top: ${designTokens.spacingM};
      `}
    >
      <Spacings.Inline scale="m" alignItems="center" justifyContent="flex-end">
        {props.displaySecondaryButton && (
          <SecondaryButton
            label={props.labelSecondary}
            onClick={props.onCancel}
            iconLeft={props.iconLeftSecondaryButton}
            {...filterDataAttributes(props.dataAttributesSecondaryButton)}
          />
        )}
        <PrimaryButton
          label={props.labelPrimary}
          onClick={props.onConfirm}
          isDisabled={props.isPrimaryButtonDisabled}
          {...filterDataAttributes(props.dataAttributesPrimaryButton)}
        />
      </Spacings.Inline>
    </div>
  );
};
DialogFooter.displayName = 'DialogFooter';
DialogFooter.defaultProps = defaultProps;

export default DialogFooter;
