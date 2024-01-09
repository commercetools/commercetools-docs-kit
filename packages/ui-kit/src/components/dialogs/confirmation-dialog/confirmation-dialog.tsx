import React, { ReactNode, SyntheticEvent } from 'react';
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
  labelFlatButton: string;
  labelSecondary: string;
  labelPrimary: string;
  isPrimaryButtonDisabled?: boolean;
  onFlatButtonClick?: (event: SyntheticEvent) => void;
  onCancel: (event: SyntheticEvent) => void;
  onConfirm: (event: SyntheticEvent) => void;
  dataAttributesSecondaryButton?: { [key: string]: string };
  dataAttributesPrimaryButton?: { [key: string]: string };
  dataAttributesFlatButton?: { [key: string]: string };
  getParentSelector?: () => HTMLElement;
  testid?: string;
};
const defaultProps: Pick<
  Props,
  'labelSecondary' | 'labelPrimary' | 'labelFlatButton'
> = {
  labelSecondary: 'Cancel',
  labelPrimary: 'Confirm',
  labelFlatButton: '',
};

const ConfirmationDialog = (props: Props) => (
  <DialogContainer
    testId={props.testid}
    isOpen={props.isOpen}
    onClose={props.onClose}
    size={props.size}
    zIndex={props.zIndex}
    title={props.title}
    getParentSelector={props.getParentSelector}
  >
    <DialogHeader title={props.title} onClose={props.onClose} />
    <DialogContent>{props.children}</DialogContent>
    <DialogFooter
      labelFlatButton={props.labelFlatButton}
      labelSecondary={props.labelSecondary}
      labelPrimary={props.labelPrimary}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      onFlatButtonClick={props.onFlatButtonClick}
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
      dataAttributesFlatButton={props.dataAttributesFlatButton}
    />
  </DialogContainer>
);
ConfirmationDialog.displayName = 'ConfirmationDialog';
ConfirmationDialog.defaultProps = defaultProps;

export default ConfirmationDialog;
