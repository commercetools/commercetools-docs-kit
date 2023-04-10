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
  labelSecondary?: string;
  labelPrimary: string;
  isPrimaryButtonDisabled?: boolean;
  onSecondaryButtonClick?: (event: SyntheticEvent) => void;
  onPrimaryButtonClick: (event: SyntheticEvent) => void;
  dataAttributesSecondaryButton?: { [key: string]: string };
  dataAttributesPrimaryButton?: { [key: string]: string };
  getParentSelector?: () => HTMLElement;
  iconLeftSecondaryButton?: ReactElement;
  displaySecondaryButton?: boolean;
};
const defaultProps: Pick<Props, 'labelSecondary' | 'labelPrimary'> = {
  labelSecondary: 'Cancel',
  labelPrimary: 'Save',
};

const FormDialog = (props: Props) => (
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
      labelSecondary={props.labelSecondary || ''}
      labelPrimary={props.labelPrimary}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      onCancel={props.onSecondaryButtonClick}
      onConfirm={props.onPrimaryButtonClick}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
      iconLeftSecondaryButton={props.iconLeftSecondaryButton}
      displaySecondaryButton={props.displaySecondaryButton}
    />
  </DialogContainer>
);
FormDialog.displayName = 'FormDialog';
FormDialog.defaultProps = defaultProps;

export default FormDialog;
