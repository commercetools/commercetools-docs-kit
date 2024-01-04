import React from 'react';
import type { ReactElement, SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import PrimaryButton from '@commercetools-uikit/primary-button';
import FlatButton from '@commercetools-uikit/flat-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import { designTokens } from '@commercetools-uikit/design-system';
import omitBy from 'lodash.omitby';

function filterDataAttributes<T extends object>(obj: T) {
  return omitBy<T>(obj, (_value, key) => !key.startsWith('data-'));
}

type Props = {
  labelFlatButton: string;
  labelSecondary: string;
  labelPrimary: string;
  onClick?: (event: SyntheticEvent) => void;
  onCancel?: (event: SyntheticEvent) => void;
  onConfirm: (event: SyntheticEvent) => void;
  isPrimaryButtonDisabled: boolean;
  dataAttributesPrimaryButton: { [key: string]: string };
  dataAttributesSecondaryButton: { [key: string]: string };
  dataAttributesFlatButton: { [key: string]: string };
  children?: never;
  iconLeftFlatButton?: ReactElement;
  iconLeftSecondaryButton?: ReactElement;
  displayFlatButton?: boolean;
  displaySecondaryButton?: boolean;
  displayPrimaryButton?: boolean;
};
const defaultProps: Pick<
  Props,
  | 'isPrimaryButtonDisabled'
  | 'dataAttributesPrimaryButton'
  | 'dataAttributesSecondaryButton'
  | 'dataAttributesFlatButton'
  | 'displayPrimaryButton'
> = {
  isPrimaryButtonDisabled: false,
  dataAttributesPrimaryButton: {},
  dataAttributesSecondaryButton: {},
  dataAttributesFlatButton: {},
  displayPrimaryButton: true,
};

const DialogFooter = (props: Props) => {
  return (
    <div
      css={css`
        margin-top: ${designTokens.spacingM};
        margin-bottom: ${designTokens.spacingL};
      `}
    >
      <Spacings.Inline scale="l" alignItems="center" justifyContent="flex-end">
        {props.displayFlatButton && (
          <FlatButton
            label={props.labelFlatButton}
            onClick={props.onClick}
            icon={props.iconLeftFlatButton}
            {...filterDataAttributes(props.dataAttributesFlatButton)}
          />
        )}
        {props.displaySecondaryButton && (
          <SecondaryButton
            label={props.labelSecondary}
            onClick={props.onCancel}
            iconLeft={props.iconLeftSecondaryButton}
            {...filterDataAttributes(props.dataAttributesSecondaryButton)}
          />
        )}
        {props.displayPrimaryButton && (
          <PrimaryButton
            label={props.labelPrimary}
            onClick={props.onConfirm}
            isDisabled={props.isPrimaryButtonDisabled}
            {...filterDataAttributes(props.dataAttributesPrimaryButton)}
          />
        )}
      </Spacings.Inline>
    </div>
  );
};
DialogFooter.displayName = 'DialogFooter';
DialogFooter.defaultProps = defaultProps;

export default DialogFooter;
