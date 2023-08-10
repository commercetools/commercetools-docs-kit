import { useModalState, FormDialog } from '@commercetools-docs/ui-kit';
import { useContext, useEffect } from 'react';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';
import SelectField from '@commercetools-uikit/select-field';
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { LearningContextApi, LearningContextState } from './learning-context';
import { useFormik } from 'formik';
import FirstName from './first-name';
import ChatMessageHistory from './chat-message-history';
import styled from '@emotion/styled';

export type TProfileFormValues = {
  chatInput: string;
  chatMode: string;
};

const ChatMessagesWrapper = styled.div`
  background-color: red;
  overflow-y: scroll;
  height: 50vh;
`;

const randomMessages = [
  {
    text: "Hey, how's it going? Hey, how's it going? Hey, how's it going? Hey, how's it going? Hey, how's it going? ",
    from: 'Alice',
  },
  { text: 'I just finished that project!', from: 'Bob' },
  { text: 'Did you watch the game last night?', from: 'Charlie' },
  { text: 'Remember to bring your umbrella today.', from: 'David' },
  { text: 'Can we meet at the café tomorrow?', from: 'Eve' },
  { text: 'I love the new design!', from: 'Fiona' },
  { text: "Don't forget to buy some groceries.", from: 'George' },
  { text: 'Just landed safely. Vacation time!', from: 'Hannah' },
  { text: 'Coding is so much fun!', from: 'Isaac' },
  { text: "Let's catch up over lunch.", from: 'Jack' },
  { text: 'The concert was amazing!', from: 'Karen' },
  { text: 'Check out this cool article I found.', from: 'Liam' },
  { text: 'Can you believe the traffic today?', from: 'Mia' },
  { text: 'Working late again, see you tomorrow.', from: 'Nora' },
  { text: 'Just adopted a cute puppy!', from: 'Oliver' },
  { text: 'Have a great day at work!', from: 'Paul' },
  { text: 'Movie night at my place this Friday.', from: 'Quinn' },
  { text: "Let's plan a hiking trip soon.", from: 'Rachel' },
  { text: 'The party was a blast, thanks!', from: 'Sam' },
  { text: 'New recipe: Chocolate chip cookies!', from: 'Tina' },
];

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
        <ChatMessagesWrapper>
          <ChatMessageHistory messages={randomMessages} />
        </ChatMessagesWrapper>

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
