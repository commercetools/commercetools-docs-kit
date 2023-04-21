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
  labelSecondary: string;
  labelPrimary: string;
  isPrimaryButtonDisabled?: boolean;
  onCancel: (event: SyntheticEvent) => void;
  onConfirm: (event: SyntheticEvent) => void;
  dataAttributesSecondaryButton?: { [key: string]: string };
  dataAttributesPrimaryButton?: { [key: string]: string };
  getParentSelector?: () => HTMLElement;
};
const defaultProps: Pick<Props, 'labelSecondary' | 'labelPrimary'> = {
  labelSecondary: 'Cancel',
  labelPrimary: 'Confirm',
};

const ConfirmationDialog = (props: Props) => (
  <DialogContainer
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
      labelSecondary={props.labelSecondary}
      labelPrimary={props.labelPrimary}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
    />
  </DialogContainer>
);
ConfirmationDialog.displayName = 'ConfirmationDialog';
ConfirmationDialog.defaultProps = defaultProps;

export default ConfirmationDialog;
