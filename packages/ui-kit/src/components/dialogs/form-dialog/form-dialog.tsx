import React from 'react';
import type { SyntheticEvent, ReactNode, ReactElement } from 'react';
import DialogContainer from '../internals/dialog-container';
import DialogContent from '../internals/dialog-content';
import DialogFooter from '../internals/dialog-footer';
import DialogHeader from '../internals/dialog-header';

type Props = {
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  title: string;
  size?: 'm' | 'l' | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 'scale';
  zIndex?: number;
  children: ReactNode;
  labelFlatButton?: string;
  labelSecondary?: string;
  labelPrimary: string;
  isPrimaryButtonDisabled?: boolean;
  displayPrimaryButton?: boolean;
  iconLeftPrimaryButton?: ReactElement;
  onFlatButtonClick?: (event: SyntheticEvent) => void;
  onSecondaryButtonClick?: (event: SyntheticEvent) => void;
  onPrimaryButtonClick: (event: SyntheticEvent) => void;
  dataAttributesSecondaryButton?: { [key: string]: string };
  dataAttributesPrimaryButton?: { [key: string]: string };
  getParentSelector?: () => HTMLElement;
  iconLeftSecondaryButton?: ReactElement;
  displaySecondaryButton?: boolean;
  displayFlatButton?: boolean;
  iconLeftFlatButton?: ReactElement;
  testid?: string;
  background?: string;
};
const defaultProps: Pick<
  Props,
  'labelSecondary' | 'labelPrimary' | 'displayPrimaryButton'
> = {
  labelSecondary: 'Cancel',
  labelPrimary: 'Save',
  displayPrimaryButton: true,
};

const FormDialog = (props: Props) => (
  <DialogContainer
    testId={props.testid}
    isOpen={props.isOpen}
    onClose={props.onClose}
    size={props.size}
    zIndex={props.zIndex}
    title={props.title}
    getParentSelector={props.getParentSelector}
    background={props.background}
  >
    <DialogHeader title={props.title} onClose={props.onClose} />
    <DialogContent hideTopBorder={props.title === ''}>
      {props.children}
    </DialogContent>
    <DialogFooter
      labelFlatButton={props.labelFlatButton || ''}
      labelSecondary={props.labelSecondary || ''}
      labelPrimary={props.labelPrimary}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      onFlatButtonClick={props.onFlatButtonClick}
      onCancel={props.onSecondaryButtonClick}
      onConfirm={props.onPrimaryButtonClick}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
      iconLeftSecondaryButton={props.iconLeftSecondaryButton}
      displayFlatButton={props.displayFlatButton}
      iconLeftFlatButton={props.iconLeftFlatButton}
      displaySecondaryButton={props.displaySecondaryButton}
      iconLeftPrimaryButton={props.iconLeftPrimaryButton}
      displayPrimaryButton={props.displayPrimaryButton}
    />
  </DialogContainer>
);
FormDialog.displayName = 'FormDialog';
FormDialog.defaultProps = defaultProps;

export default FormDialog;
