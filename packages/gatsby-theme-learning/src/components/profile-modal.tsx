import {
  FormDialog,
  useModalState,
} from '@commercetools-frontend/application-components';
import TextField from '@commercetools-uikit/text-field';

const ProfileModal = () => {
  const formModalState = useModalState(true);
  return (
    <FormDialog
      title="Update email"
      isOpen={formModalState.isModalOpen}
      onClose={formModalState.closeModal}
      isPrimaryButtonDisabled={true}
      onSecondaryButtonClick={() => null}
      onPrimaryButtonClick={() => null}
    >
      <TextField
        name="email"
        title="Email"
        isRequired={true}
        value={'aa@aa.com'}
        errors={undefined}
        touched={true}
        onChange={() => null}
        onBlur={() => null}
      />
    </FormDialog>
  );
};
export default ProfileModal;
