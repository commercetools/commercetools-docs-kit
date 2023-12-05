import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  useModalState,
  FormDialog,
  designSystem,
} from '@commercetools-docs/ui-kit';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { ErrorMessage } from '@commercetools-uikit/messages';
import { FEEDBACK_DOWN } from './chat-messages';
import { CHAT_API_BASE_URL } from './chat.const';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';

const FEEDBACK_CHECKBOXES = [
  { key: 'innacurate', value: 'The information provided was inaccurate.' },
  { key: 'problem', value: 'I did not solve my problem.' },
  { key: 'broken', value: 'Something is broken.' },
];


const ChatFeedbackModal = () => {
  const { closeModal, openModal, isModalOpen } = useModalState();
  const [feedbackContext, setFeedbackContext] = useState();
  const [textFieldTitle, setTextFieldTitle] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { getAuthToken } = useAuthToken();

  const submitFeedback = useCallback(
    async (values, actions) => {
      const apiEndpoint = `${CHAT_API_BASE_URL}/assist/feedback`;
      const accessToken = await getAuthToken();
      try {
        setIsSubmitting(true);
        await fetch(apiEndpoint, {
          method: 'POST',
          body: JSON.stringify({
            messageId: feedbackContext.messageId,
            conversationId: feedbackContext.conversationId,
            score: feedbackContext.feedback,
            comment: values.textFeedback,
            checkboxes: values.optionFeedback,
          }),
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        actions?.resetForm(); // to be checked
      } catch (error) {
        setHasError(true);
        console.error('submitFeedback - error', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [getAuthToken, feedbackContext]
  );

  const formik = useFormik({
    initialValues: {
      textFeedback: '',
      optionFeedback: [],
    },
    onSubmit: async (values, actions) => {
      await submitFeedback(values, actions);
      feedbackContext.setFeedbackResults({
        ...feedbackContext.feedbackResults,
        [feedbackContext.messageId]: feedbackContext.feedback,
      });
      closeModal();
    },
  });

  const resetState = () => {
    setTextFieldTitle();
    setIsSubmitting(false);
    setHasError(false);
    formik?.resetForm();
  };

  const handleOptionFeedbackChange = (key, value, checked) => {
    if (formik.values.optionFeedback.find((item) => item.key === key)) {
      formik.setFieldValue(
        'optionFeedback',
        formik.values.optionFeedback.filter((item) => item.key !== key)
      );
    } else {
      formik.setFieldValue('optionFeedback', [
        ...formik.values.optionFeedback,
        { key, label: value },
      ]);
    }
  };

  const handleSubmitAndClose = async () => {
    await submitFeedback(formik.values, formik.actions);
    feedbackContext.setFeedbackResults({
      ...feedbackContext.feedbackResults,
      [feedbackContext.messageId]: feedbackContext.feedback,
    });
    closeModal();
  };

  const isOptionChecked = (key) =>
    !!formik.values.optionFeedback.find((item) => item.key === key);

  useEffect(() => {
    const handleCustomEvent = (event) => {
      setFeedbackContext(event.detail);
      resetState();
      openModal();
    };

    window.addEventListener('openChatFeedbackModal', handleCustomEvent);

    return () => {
      window.removeEventListener('openChatFeedbackModal', handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    setTextFieldTitle &&
      setTextFieldTitle(
        feedbackContext?.feedback === FEEDBACK_DOWN
          ? 'What went wrong?'
          : 'What did you like?'
      );
  }, [feedbackContext]);

  return (
    <FormDialog
      size="l"
      title="Send your feedback"
      labelPrimary="Send"
      labelSecondary="Cancel"
      isOpen={isModalOpen}
      onClose={async () => {
        await handleSubmitAndClose();
      }}
      displaySecondaryButton
      isPrimaryButtonDisabled={isSubmitting}
      background={designSystem.colors.light.surfaceSecondaryTopMenu}
      onPrimaryButtonClick={formik.handleSubmit}
      onSecondaryButtonClick={async () => {
        await handleSubmitAndClose();
      }}
    >
      <SpacingsStack scale="m">
        <MultilineTextField
          key="textFeedback"
          name="textFeedback"
          placeholder="Optional"
          title={textFieldTitle}
          value={formik.values.textFeedback}
          touched={formik.touched.textFeedback}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div>
          {feedbackContext?.feedback === FEEDBACK_DOWN &&
            FEEDBACK_CHECKBOXES.map((checkbox) => (
              <CheckboxInput
                key={checkbox.key}
                value={checkbox.value}
                name="optionFeedback"
                onChange={(event) =>
                  handleOptionFeedbackChange(
                    checkbox.key,
                    checkbox.value,
                    event.target.checked
                  )
                }
                isChecked={isOptionChecked(checkbox.key)}
              >
                {checkbox.value}
              </CheckboxInput>
            ))}
        </div>
        {hasError && (
          <ErrorMessage>
            An error occurred while submitting your feedback.
          </ErrorMessage>
        )}
      </SpacingsStack>
    </FormDialog>
  );
};

export default ChatFeedbackModal;
