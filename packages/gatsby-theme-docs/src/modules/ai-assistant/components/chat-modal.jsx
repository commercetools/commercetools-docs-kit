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
import MultilineTextField from '@commercetools-uikit/multiline-text-field';
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';
import useAuthentication from '../../sso/hooks/use-authentication';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';
import { CHAT_ROLE_ASSISTANT, CHAT_ROLE_USER } from './chat.const';
import ChatMessages from './chat-messages';
import {
  isWaitingChunk,
  isNotValidatedUser,
  loadLocalChatState,
  setLocalStorageChatLocked,
  setLocalStorageChatMode,
  setLocalStorageMessages,
  setLocalStorageReferences,
} from './chat.utils';
import submitPng from '../icons/paper-plane.png';
import CTCube from '../icons/black-white-ct-cube.svg';
import {
  AuthenticatedContextApi,
  AuthenticatedContextState,
} from '../../../components/authenticated-context';
import ConfigContext from '../../../components/config-context';
import ChatModalLoggedOut from './chat-modal-logged-out';
import ChatModalNotVerified from './chat-modal-not-verified';
import LegalDisclaimer from './chat-modal-legal-disclaimer';
import {
  CharCount,
  ChatContainer,
  ChatInputBox,
  ChatMainArea,
  ChatMessagesWrapper,
  CubeContainer,
  DisclaimerTextMobile,
  InputTextWrapper,
  LeftBlank,
  LockedChatFooterContainer,
  ResetButtonBox,
  RestartButtonBox,
  RightBlank,
  SubmitButtonBox,
} from './chat-modal-css-components';
import useChatInit from '../hooks/use-chat-init';
import ChatSide from './chat-side';
import ChatModalLoading from './chat-modal-loading';

export const DEV_TOOLING_MODE = 'dev-tooling-ts-code-generator';

const ASSISTANT_STATE_OPEN = 'open';
const ASSISTANT_STATE_LOGGED_OUT = 'loggedout';
const ASSISTANT_STATE_NOT_VERIFIED = 'unverified';
const ASSISTANT_STATE_INITIALIZING = 'initializing';

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
  const [chatMessages, setAppChatMessages] = useState([]);
  const [chatReferences, setAppChatReferences] = useState([]);
  const [currentChatMode, setAppCurrentChatMode] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replayMessage, setReplayMessage] = useState();
  const [chatLocked, setAppChatLocked] = useState(false);
  const [chatAvailableModes, setChatAvailableModes] = useState([]);
  const [initLoading, setInitLoading] = useState(false);

  const [inputMessageLengthState, setInputMessageLengthState] = useState();
  const {
    isAuthenticated,
    user,
    isLoading: isAuthLoading,
  } = useAuthentication();
  const { getAuthToken } = useAuthToken();
  const { aiAssistantApiBaseUrl } = useContext(ConfigContext);

  /* App state and localstorage setter for messages */
  const setChatMessages = (messages, keepLocalStorage = false) => {
    setAppChatMessages(messages);
    if (!keepLocalStorage) {
      setLocalStorageMessages(messages);
    }
  };
  const { chatInit } = useChatInit();
  const [assistantState, setAssistantState] = useState(
    ASSISTANT_STATE_INITIALIZING
  );

  /* App state and localstorage setter for references */
  const setChatReferences = (references, keepLocalStorage = false) => {
    setAppChatReferences(references);
    if (!keepLocalStorage) {
      setLocalStorageReferences(references);
    }
  };

  /* App state and localstorage setter for locked */
  const setChatLocked = (isLocked, keepLocalStorage = false) => {
    setAppChatLocked(isLocked);
    if (!keepLocalStorage) {
      setLocalStorageChatLocked(isLocked);
    }
  };

  /* App state and localstorage setter for chat mode */
  const setCurrentChatMode = (currentMode, keepLocalStorage = false) => {
    setAppCurrentChatMode(currentMode);
    if (!keepLocalStorage) {
      setLocalStorageChatMode(currentMode);
    }
  };

  const resetChatState = (keepLocalState) => {
    setChatMessages([], keepLocalState);
    setChatReferences([], keepLocalState);
    setChatLocked(false, keepLocalState);
    setMessageHistoryInit(false, keepLocalState);
  };

  const setLoadedChatState = ({ messages, references, isLocked, mode }) => {
    if (messages && messages.length > 0) {
      setAppChatMessages(messages);
    }
    if (references && references.length > 0) {
      setAppChatReferences(references);
    }
    if (isLocked) {
      setAppChatLocked(isLocked);
    }
    if (mode) {
      setAppCurrentChatMode(mode);
    }
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
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [chatMessages, assistantState]);

  useEffect(() => {
    const fetchChatInit = async () => {
      setInitLoading(true);
      try {
        const { modes } = await chatInit();
        setChatAvailableModes(modes);
      } catch (error) {
        console.error('error initializing ai assistant', error);
        setChatAvailableModes([]);
      } finally {
        setInitLoading(false);
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
    // entry point of the ai assistant chat
    const handleCustomEvent = (event) => {
      const loadedState = loadLocalChatState(event.detail);
      if (loadedState) {
        setLoadedChatState(loadedState);
      }
      setChatConfig(event.detail);
      openAiAssistantModal({ title: '', isDismissable: true });
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
      // when changing chat mode, we want to re-submit to the new chat
      // the latest message submitted by the user. So we store that message (if exists)
      const lastUserMessage = chatMessages
        .reverse()
        .find(({ role }) => role === CHAT_ROLE_USER);
      if (lastUserMessage) {
        setReplayMessage(lastUserMessage);
      }
      resetChatState();
      setCurrentChatMode(chatModeConfig);
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
    if (replayMessage && currentChatMode !== 'dev-tooling-ts-code-generator') {
      // if the chat mode changes and there is at least one message sent from
      // the user, we switch mode and re-submit this latest message.
      // We don't want to replay the last message if the user is entering dev-tooling mode
      // as free text input is going to be blocked.
      submitChatMessages([replayMessage], formik.values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatMode]);

  useEffect(() => {
    if (initLoading || isAuthLoading) {
      setAssistantState(ASSISTANT_STATE_INITIALIZING);
    } else {
      if (!isAuthenticated) {
        setAssistantState(ASSISTANT_STATE_LOGGED_OUT);
      }
      if (isAuthenticated && isNotValidatedUser(user)) {
        setAssistantState(ASSISTANT_STATE_NOT_VERIFIED);
      }
      if (isAuthenticated && !isNotValidatedUser(user)) {
        setAssistantState(ASSISTANT_STATE_OPEN);
      }
    }
  }, [isAuthenticated, user, initLoading, isAuthLoading]);

  return (
    <FormDialog
      size="scale"
      title=""
      labelPrimary="Send"
      isOpen={!!aiAssistantModal}
      onClose={() => {
        closeAiAssistantModal();
        setConversationId(createNewConversationId());
        resetChatState(true);
        setMessageHistoryInit(false);
        setReplayMessage();
        formik.resetForm();
      }}
      displayPrimaryButton={!(!!chatConfig?.readOnly)}
      isPrimaryButtonDisabled={
        !(formik.isValid && formik.dirty) || formik.isSubmitting
      }
      displaySecondaryButton={false}
      onPrimaryButtonClick={() => !chatConfig?.readOnly && formik.submitForm()}
      background={designSystem.colors.light.surfaceSecondaryTopMenu}
    >
      {/* loading state */}
      {assistantState === ASSISTANT_STATE_INITIALIZING && <ChatModalLoading />}
      {/* logged out state */}
      {assistantState === ASSISTANT_STATE_LOGGED_OUT && (
        <ChatModalLoggedOut aiAssistantCfg={chatConfig} />
      )}
      {/* not verified  state */}
      {assistantState === ASSISTANT_STATE_NOT_VERIFIED && (
        <ChatModalNotVerified />
      )}
      {/* standard state */}
      {assistantState === ASSISTANT_STATE_OPEN && (
        <ChatContainer data-testid="ai-assistant-modal">
          <LeftBlank />
          <ChatSide
            user={user}
            chatMode={formik.values.chatMode}
            debugMode={formik.values.debugMode}
            chatAvailableModes={chatAvailableModes}
            chatReferences={chatReferences}
            currentChatMode={currentChatMode}
            handleChatDebugModeChange={handleChatDebugModeChange}
            handleChatModeChange={handleChatModeChange}
            handleQuestionButtonClicked={handleQuestionButtonClicked}
          />
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

            {!chatLocked && (
              <ChatInputBox>

                {!chatConfig?.readOnly && <InputTextWrapper>
                  <MultilineTextField
                    data-testid="chat-input-field"
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
                </InputTextWrapper>}
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
