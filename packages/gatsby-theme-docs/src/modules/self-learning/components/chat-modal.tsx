import { useModalState, FormDialog } from '@commercetools-docs/ui-kit';
import { useContext, useEffect } from 'react';
import { LearningContextApi, LearningContextState } from './learning-context';

export type TProfileFormValues = {
  firstName: string;
  lastName: string;
  company: string;
};

const ChatModal = () => {
  const { closeChatModal } = useContext(LearningContextApi);
  const {
    ui: { chatModal },
  } = useContext(LearningContextState);

  const { closeModal, openModal, isModalOpen } = useModalState();

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
      isPrimaryButtonDisabled={true}
      displaySecondaryButton={false}
      onPrimaryButtonClick={() => null}
    >
      <p>Chat launched with selected mode: {chatModal?.chatSelectedMode}</p>
      <p>Available modes: {chatModal?.chatAvailableModes}</p>
    </FormDialog>
  );
};

export default ChatModal;
