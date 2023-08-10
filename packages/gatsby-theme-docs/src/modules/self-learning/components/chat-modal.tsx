import { useModalState, FormDialog } from '@commercetools-docs/ui-kit';
import { useContext, useEffect } from 'react';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';
import SelectField from '@commercetools-uikit/select-field';
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { LearningContextApi, LearningContextState } from './learning-context';
import { useFormik } from 'formik';
import FirstName from './first-name';

export type TProfileFormValues = {
  chatInput: string;
  chatMode: string;
};

const submitChatMessage = (message: string, chatMode: string) => {
  console.log('submitting message', message);
};

const renderError = (errorKey: string) => {
  if (errorKey === 'missing') {
    return 'Required field.';
  }
  return null;
};

const ChatModal = () => {
  const { closeChatModal } = useContext(LearningContextApi);
  const {
    ui: { chatModal },
  } = useContext(LearningContextState);

  const { closeModal, openModal, isModalOpen } = useModalState();

  const formik = useFormik<TProfileFormValues>({
    initialValues: {
      chatInput: '',
      chatMode: chatModal?.chatSelectedMode || '',
    },
    validate: (formikValues: TProfileFormValues) => {
      const missingFields: Record<string, { missing: boolean }> = {};
      if (MultilineTextInput.isEmpty(formikValues.chatInput)) {
        missingFields.chatInput = { missing: true };
      }
      return missingFields;
    },
    onSubmit: async (formikValues: TProfileFormValues) => {
      submitChatMessage(formikValues.chatInput, formikValues.chatMode);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChatModeChange = (event: any) => {
    formik.setFieldValue('chatMode', event.target.value);
  };

  // binds the modal state to the context isProfileModalOpen property
  useEffect(() => {
    if (chatModal) {
      openModal();
    } else {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatModal]);

  return (
    <FormDialog
      testid="profile-modal"
      size="scale"
      title={chatModal?.title || 'Update your profile.'}
      labelPrimary="Send"
      isOpen={isModalOpen}
      onClose={chatModal?.isDismissable ? () => closeChatModal() : undefined}
      isPrimaryButtonDisabled={
        !(formik.isValid && formik.dirty) || formik.isSubmitting
      }
      displaySecondaryButton={false}
      onPrimaryButtonClick={() => null}
    >
      <SpacingsStack scale="l">
        <h1>
          Hey, <FirstName />
        </h1>
        <SelectField
          title=""
          value={formik.values.chatMode}
          options={chatModal?.chatAvailableModes.map((mode) => ({
            value: mode,
            label: mode,
          }))}
          horizontalConstraint={7}
          onChange={handleChatModeChange}
        />
        <p>I am Clippy, your assistat, how can I help you today?</p>
        <MultilineTextField
          key="chatInput"
          name="chatInput"
          title=""
          placeholder="Send a message"
          value={formik.values.chatInput}
          touched={formik.touched.chatInput}
          errors={
            MultilineTextField.toFieldErrors<TProfileFormValues>(formik.errors)
              .chatInput
          }
          defaultExpandMultilineText
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          renderError={renderError}
        />
      </SpacingsStack>
    </FormDialog>
  );
};

export default ChatModal;
