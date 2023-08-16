import { useContext, useState, useEffect } from 'react';
import { LearningContextState } from './learning-context';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { useSendVerificationEmail } from '../hooks/use-send-verification-email';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

import { MailIcon } from '@commercetools-uikit/icons';

const SendVerificationEmailButton = () => {
  const {
    user: { profile },
  } = useContext(LearningContextState);
  const {
    performSendVerificationEmail,
    isLoading,
    sendVerificationEmail,
    error,
  } = useSendVerificationEmail({
    userId: profile?.user_id || '',
  });
  const [buttonLabel, setButtonLabel] = useState('Send Verification Email');

  const handleSendEmail = async () => {
    performSendVerificationEmail();
  };
  useEffect(() => {
    if (sendVerificationEmail) {
      setButtonLabel('Sent Successfully');
    }
    if (error) setButtonLabel('An error occurred, please try again.');
    if (isLoading) setButtonLabel('Sending email');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isLoading, sendVerificationEmail]);

  return (
    <PrimaryButton
      label={buttonLabel}
      onClick={handleSendEmail}
      size="medium"
      iconLeft={
        isLoading ? <LoadingSpinner scale="s" /> : <MailIcon size="medium" />
      }
    />
  );
};

export default SendVerificationEmailButton;
