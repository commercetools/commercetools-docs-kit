import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { useFormik } from 'formik';
import { monotonicFactory } from 'ulid';
import { FormDialog, designSystem } from '@commercetools-docs/ui-kit';
import FlatButton from '@commercetools-uikit/flat-button';
import SelectField from '@commercetools-uikit/select-field';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import useAuthentication from '../../sso/hooks/use-authentication';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';
import { CHAT_ROLE_ASSISTANT, CHAT_ROLE_USER } from './chat.const';
import ChatMessages from './chat-messages';
import { isCtUser, isWaitingChunk, isNotValidatedUser } from './chat.utils';
import ReferencesList from './chat-references-list';
import robotPng from '../icons/robot.png';
import submitPng from '../icons/paper-plane.png';
import CTCube from '../icons/black-white-ct-cube.svg';
import CodeGeneratorSidebar from './code-generator-sidebar';
import {
  AuthenticatedContextApi,
  AuthenticatedContextState,
} from '../../../components/authenticated-context';
import ConfigContext from '../../../components/config-context';
import ChatModalLoggedOut from './chat-modal-logged-out';
import ChatModalNotVerified from './chat-modal-not-verified';
import LegalDisclaimer from './chat-modal-legal-disclaimer';
import {
  BackgroundWrapper,
  CharCount,
  ChatBottomContainer,
  ChatContainer,
  ChatInputBox,
  ChatMainArea,
  ChatMessagesWrapper,
  ChatSideArea,
  CubeContainer,
  DisclaimerText,
  DisclaimerTextMobile,
  InputTextWrapper,
  LeftBlank,
  LockedChatFooterContainer,
  ResetButtonBox,
  RestartButtonBox,
  RightBlank,
  SideDebugContainer,
  SideTopContainer,
  SubmitButtonBox,
} from './chat-modal-css-components';
import useChatInit from '../hooks/use-chat-init';

export const DEV_TOOLING_MODE = 'dev-tooling-ts-code-generator';

const ChatModal = () => {
  const divRef = useRef(null);
  const ulid = monotonicFactory();
  const createNewConversationId = () => {
    return ulid();
  };
  const { openAiAssistantModal, closeAiAssistantModal } = useContext(
    AuthenticatedContextApi
  );
  const {
    ui: { aiAssistantModal },
  } = useContext(AuthenticatedContextState);
  const [chatConfig, setChatConfig] = useState();
  const [messageHistoryInit, setMessageHistoryInit] = useState(false);
  const [isMessageInputFocused, setMessageInputFocused] = useState(false);
  const [conversationId, setConversationId] = useState(
    createNewConversationId()
  );
  const [chatAvailableModes, setChatAvailableModes] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatReferences, setChatReferences] = useState([]);
  const [currentChatMode, setCurrentChatMode] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replayMessage, setReplayMessage] = useState();
  const [chatLocked, setChatLocked] = useState(false);
  const [inputMessageLengthState, setInputMessageLengthState] = useState();
  const { isAuthenticated, user } = useAuthentication();
  const { getAuthToken } = useAuthToken();
  const { aiAssistantApiBaseUrl } = useContext(ConfigContext);
  const { chatInit } = useChatInit();

  const resetChatState = () => {
    setChatMessages([]);
    setChatReferences([]);
    setChatLocked(false);
    setMessageHistoryInit(false);
  };

  const applyNames = (message) =>
    CHAT_ROLE_ASSISTANT.includes(message.role)
      ? { ...message, name: currentChatMode?.botName }
      : { ...message, name: user?.given_name || '' };

  const handleInputBlur = (e) => {
    setMessageInputFocused(false);
    formik.handleBlur(e);
  };

  const handleInputFocus = (e) => {
    setMessageInputFocused(true);
  };

  useEffect(() => {
    const fetchChatInit = async () => {
      try {
        const {modes} = await chatInit();
        setChatAvailableModes(modes);
      } catch (error) {
        console.error('error initializing ai assistant', error);
        setChatAvailableModes([]);
      }
    };
    if (chatConfig && isAuthenticated && !isNotValidatedUser(user)) {
      fetchChatInit();
    }
  }, [user, isAuthenticated, chatInit, chatConfig]);

  useEffect(() => {
    // initial config from chat button
    if (chatConfig?.chatSelectedMode) {
      formik.setFieldValue('chatMode', chatConfig.chatSelectedMode);
      const chatModeConfig = chatAvailableModes.find(
        (mode) => mode.key === chatConfig?.chatSelectedMode
      );
      if (chatModeConfig) {
        setCurrentChatMode(chatModeConfig);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatAvailableModes, chatConfig]);

  const submitMessages = useCallback(
    async (newMessages, isDebug = false) => {
      const apiEndpoint = `${aiAssistantApiBaseUrl}/api/assist/chat?mode=${currentChatMode.key}&stream=true&debug=${isDebug}`;
      const accessToken = await getAuthToken();
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          body: JSON.stringify({
            conversationId,
            messages: [
              ...chatMessages.filter((message) => message.role !== 'system'), // filters out system messages added if debug is enabled
              ...newMessages,
            ],
          }),
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        // BEWARE: it's not a *proper* streaming reading. It's a simple workaround to avoid timeouts.
        // It keeps disregarding "waiting" chunks until a non waiting chunk is sent. These are send by the server to keep the cloud function alive.
        // (TBD a character that cannot actually occur in the payload would be better as a "waiting" signal, whitespace can occur as an actual chunk)
        // It returns when the server closes the connection, not when it has received the first data.
        // That is to make it easier for the server to stay alive for cleanup and logging work.
        let returnedChunks = [];
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // process the final chunk
            const lastChunk = decoder.decode(value, { stream: false });
            if (lastChunk) returnedChunks.push();
            const fullOutput = returnedChunks.join('');
            // console.log('on done:');
            // console.dir(fullOutput);
            // TBD catch if it's not parseable and return a useful error?
            const parsedOutput = JSON.parse(fullOutput);
            console.dir(parsedOutput);
            return parsedOutput;
          }

          const decodedChunk = decoder.decode(value, { stream: true });
          // console.log("decoded chunk: '" + decodedChunk + "'");
          if (decodedChunk && !isWaitingChunk(decodedChunk)) {
            returnedChunks.push(decodedChunk);
          }
        }
      } catch (error) {
        console.error('submitMessages - error', error);
        return undefined;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getAuthToken, currentChatMode, chatMessages, aiAssistantApiBaseUrl]
  );

  useEffect(() => {
    if (
      currentChatMode &&
      chatConfig?.messageHistory &&
      aiAssistantModal &&
      messageHistoryInit === false
    ) {
      submitChatMessages(chatConfig.messageHistory);
      setMessageHistoryInit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiAssistantModal, messageHistoryInit, chatConfig, currentChatMode]);

  useEffect(() => {
    const handleCustomEvent = (event) => {
      openAiAssistantModal({ title: '', isDismissable: true });
      setChatConfig(event.detail);
    };

    window.addEventListener('openChatModal', handleCustomEvent);

    return () => {
      window.removeEventListener('openChatModal', handleCustomEvent);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle submit message when hitting Enter.
  // User is using Command (⌘) key on Mac or Control (Ctrl) key on Windows/Linux + Enter will add a backspace.
  useEffect(() => {
    const onKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (!isMessageInputFocused) {
          return;
        }
        if (event.metaKey || event.ctrlKey) {
          event.preventDefault();
          const textarea = event.target;
          const currentValue = textarea.value;
          const selectionStart = textarea.selectionStart;
          const selectionEnd = textarea.selectionEnd;
          const newValue =
            currentValue.substring(0, selectionStart) +
            '\n' +
            currentValue.substring(selectionEnd);
          textarea.value = newValue;
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
          return;
        }
        if (event.target.value === '') {
          // submits form only if there's some text in the input field
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        formik.submitForm();
      }
    };

    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMessageInputFocused]);

  const submitChatMessages = async (newMessages, values, actions) => {
    const rollbackMessages = [...chatMessages];
    const isDebug = !!values?.debugMode;

    // append new message (optimistic approach)
    setChatMessages([...chatMessages, ...newMessages]);
    actions?.resetForm({
      values: {
        ...values,
        chatInput: '',
      },
    });
    try {
      // perform actual submission TODO: check if the new message is appended
      setIsSubmitting(true);
      const result = await submitMessages(newMessages, isDebug);
      setChatMessages(result?.messages || []);
      setChatReferences(result?.references || []);
      setChatLocked(result?.locked || false);
    } catch (error) {
      // TODO: display some sort of error message
      // in case of error restore initial messages in the UI
      console.error('error submitting messages', error);
      setChatMessages(rollbackMessages);
      if (newMessages.length === 1) {
        actions?.setFieldValue('chatInput', newMessages[0]?.content);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionButtonClicked = (content) => {
    const message = { role: CHAT_ROLE_USER, content };
    if (!isSubmitting) {
      submitChatMessages([message], formik.values);
    }
  };

  const formik = useFormik({
    initialValues: {
      chatInput: '',
      chatMode: '',
      debugMode: false,
    },
    validateOnChange: true,
    validate: (formikValues) => {
      const errors = {};
      if (MultilineTextInput.isEmpty(formikValues.chatInput)) {
        errors.chatInput = { missing: true };
      }
      if (formikValues.chatInput.length > currentChatMode?.inputMessageLimit) {
        errors.chatInput = { tooLong: true };
      }
      return errors;
    },
    onSubmit: async (values, actions) => {
      if (inputMessageLengthState === 'error') {
        return;
      }
      const newMessage = values.chatInput;
      const messages = [{ content: newMessage, role: CHAT_ROLE_USER }];
      submitChatMessages(messages, values, actions);
    },
  });

  useEffect(() => {
    const inputLength = formik?.values?.chatInput?.length || 0;
    const errorLimit = currentChatMode?.inputMessageLimit || 500;
    if (inputLength > errorLimit) {
      setInputMessageLengthState('error');
    } else {
      setInputMessageLengthState();
    }
  }, [formik.values.chatInput, currentChatMode]);

  const handleChatModeChange = (event) => {
    setConversationId(createNewConversationId());
    const chatModeKey = event?.target?.value || '';
    formik.setFieldValue('chatMode', chatModeKey);
    const chatModeConfig = chatAvailableModes.find(
      (mode) => mode.key === chatModeKey
    );
    if (chatModeConfig) {
      setCurrentChatMode(chatModeConfig);
      // when changing chat mode, we want to re-submit to the new chat
      // the latest message submitted by the user. So we store that message (if exists)
      const lastUserMessage = chatMessages
        .reverse()
        .find(({ role }) => role === CHAT_ROLE_USER);
      if (lastUserMessage) {
        setReplayMessage(lastUserMessage);
      }
      resetChatState();
    }
  };

  const handleChatDebugModeChange = (event) => {
    if (event.target.checked) {
      formik.setFieldValue('debugMode', true);
    } else {
      formik.setFieldValue('debugMode', false);
    }
  };

  const renderError = (errorKey) => {
    if (errorKey === 'missing') {
      return 'Required field.';
    }
    if (errorKey === 'tooLong') {
      return `You have ${
        formik.values.chatInput.length - currentChatMode?.inputMessageLimit
      } characters too many.`;
    }
    return null;
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (replayMessage) {
      // if the chat mode changes and there is at least one message sent from
      // the user, we switch mode and re-submit this latest message
      submitChatMessages([replayMessage], formik.values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatMode]);

  return (
    <FormDialog
      size="scale"
      title=""
      labelPrimary="Send"
      isOpen={!!aiAssistantModal}
      onClose={() => {
        closeAiAssistantModal();
        setConversationId(createNewConversationId());
        resetChatState();
        setReplayMessage();
      }}
      displayPrimaryButton={!!chatConfig?.readOnly}
      isPrimaryButtonDisabled={
        !(formik.isValid && formik.dirty) || formik.isSubmitting
      }
      displaySecondaryButton={false}
      onPrimaryButtonClick={() => !chatConfig?.readOnly && formik.submitForm()}
      background={designSystem.colors.light.surfaceSecondaryTopMenu}
    >
      {!isAuthenticated ? (
        <ChatModalLoggedOut aiAssistantCfg={chatConfig} />
      ) : isNotValidatedUser(user) ? (
        <ChatModalNotVerified />
      ) : (
        <ChatContainer data-testid="ai-assistant-modal">
          <LeftBlank />
          <ChatSideArea>
            {isCtUser(user) && (
              <SideDebugContainer>
                <CheckboxInput
                  isChecked={formik.values.debugMode === true}
                  name="debugMode"
                  onChange={handleChatDebugModeChange}
                >
                  Debug mode
                </CheckboxInput>
                <SelectField
                  title=""
                  value={formik.values.chatMode}
                  options={chatAvailableModes.map((mode) => ({
                    value: mode.key,
                    label: mode.label,
                  }))}
                  onChange={handleChatModeChange}
                />
              </SideDebugContainer>
            )}
            <SideTopContainer>
              {currentChatMode?.key === DEV_TOOLING_MODE ? (
                <CodeGeneratorSidebar
                  onQuestionClick={handleQuestionButtonClicked}
                />
              ) : chatReferences.length > 0 ? (
                <ReferencesList references={chatReferences}></ReferencesList>
              ) : (
                <BackgroundWrapper>
                  <img src={robotPng} width={400} alt="robot icon" />
                </BackgroundWrapper>
              )}
            </SideTopContainer>
            <ChatBottomContainer>
              <DisclaimerText>
                <LegalDisclaimer />
              </DisclaimerText>
            </ChatBottomContainer>
          </ChatSideArea>
          <ChatMainArea>
            <ChatMessagesWrapper ref={divRef}>
              <ChatMessages
                messages={chatMessages.map(applyNames)}
                references={chatReferences}
                chatMode={currentChatMode}
                chatLocked={chatLocked}
                isLoading={isSubmitting}
                isDebug={formik?.values?.debugMode}
                conversationId={conversationId}
              />
            </ChatMessagesWrapper>
            {/* TODO: handle chatLocked === true mode */}

            {!chatConfig?.readOnly && !chatLocked && (
              <ChatInputBox>
                <InputTextWrapper>
                  <MultilineTextField
                    key="chatInput"
                    name="chatInput"
                    title=""
                    placeholder={
                      currentChatMode?.key === DEV_TOOLING_MODE
                        ? 'Specify your use case to generate the code.'
                        : 'Use complete sentences for the best help.'
                    }
                    value={formik.values.chatInput}
                    touched={formik.touched.chatInput}
                    defaultExpandMultilineText
                    onChange={formik.handleChange}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    errors={
                      MultilineTextField.toFieldErrors(formik.errors).chatInput
                    }
                    renderError={renderError}
                    badge={
                      <CharCount status={inputMessageLengthState}>
                        {formik.values.chatInput.length}/
                        {currentChatMode?.inputMessageLimit}
                      </CharCount>
                    }
                  />
                  <SubmitButtonBox>
                    <img
                      alt="submit button"
                      src={submitPng}
                      onClick={() =>
                        !chatConfig?.readOnly && formik.submitForm()
                      }
                    />
                  </SubmitButtonBox>
                </InputTextWrapper>
                <RestartButtonBox>
                  <FlatButton
                    label="Tip: Restart the conversation when changing the topic"
                    isDisabled={chatMessages.length === 0}
                    onClick={() => {
                      setConversationId(createNewConversationId());
                      resetChatState();
                      setReplayMessage();
                    }} // reset chat messages when clicking on the restart button
                  />
                </RestartButtonBox>
              </ChatInputBox>
            )}
            {chatLocked && (
              <LockedChatFooterContainer>
                <ResetButtonBox>
                  <FlatButton
                    label="Start a new conversation"
                    onClick={() => {
                      setConversationId(createNewConversationId());
                      resetChatState();
                      setReplayMessage();
                    }} // reset chat messages when clicking on the restart button
                  />
                </ResetButtonBox>
                <CubeContainer>
                  <CTCube />
                </CubeContainer>
              </LockedChatFooterContainer>
            )}
            <DisclaimerTextMobile>
              <LegalDisclaimer />
            </DisclaimerTextMobile>
          </ChatMainArea>
          <RightBlank />
        </ChatContainer>
      )}
    </FormDialog>
  );
};

export default ChatModal;
