import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useFormik } from 'formik';
import { monotonicFactory } from 'ulid';
import {
  useModalState,
  FormDialog,
  designSystem,
} from '@commercetools-docs/ui-kit';
import FlatButton from '@commercetools-uikit/flat-button';
import SelectField from '@commercetools-uikit/select-field';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import useAuthentication from '../../sso/hooks/use-authentication';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';
import {
  CHAT_ROLE_ASSISTANT,
  CHAT_ROLE_USER,
  CHAT_API_BASE_URL,
} from './chat.const';
import ChatMessages from './chat-messages';
import styled from '@emotion/styled';
import { isCtUser, isWaitingChunk } from './chat.utils';
import ReferencesList from './chat-references-list';
import robotPng from '../icons/robot.png';
import submitPng from '../icons/paper-plane.png';
import CTCube from '../icons/black-white-ct-cube.svg';
import { Link } from 'gatsby';
import CodeGeneratorSidebar from './code-generator-sidebar';

export const DEV_TOOLING_MODE = 'dev-tooling-ts-code-generator';

const LEGAL_DISCLAIMER = (
  <>
    Results are generated using generative AI and should be verified prior to
    use. By interacting with the feature, you agree to our “
    <Link href="/../offering/ai-disclaimer" target="_blank">
      AI Content Disclaimer
    </Link>
    ”.
  </>
);

const ChatContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: 'chat';

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid-template-columns: auto 25%;
    grid-template-areas: 'chat references';
  }

  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    grid-template-columns: 15% auto 25% 15%;
    grid-template-areas: 'left-blank chat references right-blank';
  }
`;

const ChatMainArea = styled.div`
  grid-area: chat;
  display: flex;
  flex-direction: column;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    border-right: 2px solid #e1e2ea;
  }
`;

const ChatMessagesWrapper = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  padding: 0px ${designSystem.dimensions.spacings.m};
  overflow-y: scroll;
  mask-image: linear-gradient(
    to bottom,
    black calc(100% - 18px),
    transparent 100%
  );
`;

const ChatInputBox = styled.div`
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m} ${designSystem.dimensions.spacings.l}
    ${designSystem.dimensions.spacings.m};
`;

const ResetButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
`;

const LockedChatFooterContainer = styled.div`
  padding: 0 ${designSystem.dimensions.spacings.m};
`;

const CubeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
  border-bottom: 2px solid #e1e2ea;
`;

const ChatSideArea = styled.div`
  padding: 0px ${designSystem.dimensions.spacings.s};
  grid-area: references;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    display: none;
  }
`;

const InputTextWrapper = styled.div`
  display: flex;
`;

const SubmitButtonBox = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  margin-top: 38px;
  background-color: #fff;
  margin-left: 8px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const ChatBottomContainer = styled.div`
  margin-top: auto;
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m} ${designSystem.dimensions.spacings.l}
    ${designSystem.dimensions.spacings.m};
`;

const SideTopContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  overflow-y: auto;
  padding: 0px ${designSystem.dimensions.spacings.m};
`;

const BackgroundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideDebugContainer = styled.div`
  padding: 0px ${designSystem.dimensions.spacings.m};
  margin-bottom: ${designSystem.dimensions.spacings.m};
`;

const LeftBlank = styled.div`
  grid-area: left-blank;
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    display: block;
  }
`;

const RightBlank = styled.div`
  grid-area: right-blank;
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    display: block;
  }
`;

const CharCount = styled.div`
  padding-right: 5px;
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  color: ${(props) =>
    props.status
      ? `${designSystem.colors.light.textError}`
      : `${designSystem.colors.light.textFaded}`};
`;

const DisclaimerText = styled.p`
  text-align: center;
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  line-height: 22px;
  a {
    color: ${designSystem.colors.light.textPrimary};
  }
`;

const DisclaimerTextMobile = styled.p`
  margin-top: ${designSystem.dimensions.spacings.m};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  line-height: 22px;
  display: none;
  a {
    color: ${designSystem.colors.light.textPrimary};
  }
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    display: inline;
  }
`;

const ChatModal = () => {
  const divRef = useRef(null);
  const ulid = monotonicFactory();
  const createNewConversationId = () => {
    return ulid();
  };
  const [chatConfig, setChatConfig] = useState();
  const [messageHistoryInit, setMessageHistoryInit] = useState(false);
  const [isMessageInputFocused, setMessageInputFocused] = useState(false);
  const [conversationId, setConversationId] = useState(
    createNewConversationId()
  );
  const [chatMessages, setChatMessages] = useState([]);
  const [chatReferences, setChatReferences] = useState([]);
  const [currentChatMode, setCurrentChatMode] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replayMessage, setReplayMessage] = useState();
  const [chatLocked, setChatLocked] = useState(false);
  const [inputMessageLengthState, setInputMessageLengthState] = useState();
  const { closeModal, openModal, isModalOpen } = useModalState();
  const { user } = useAuthentication();
  const { getAuthToken } = useAuthToken();

  const resetChatState = () => {
    setChatMessages([]);
    setChatReferences([]);
    setChatLocked(false);
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
    // initial config from chat button
    if (chatConfig?.chatSelectedMode) {
      formik.setFieldValue('chatMode', chatConfig.chatSelectedMode);
      const chatModeConfig = chatConfig?.chatAvailableModes.find(
        (mode) => mode.key === chatConfig?.chatSelectedMode
      );
      if (chatModeConfig) {
        setCurrentChatMode(chatModeConfig);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatConfig]);

  const submitMessages = useCallback(
    async (newMessages, isDebug = false) => {
      const apiEndpoint = `${CHAT_API_BASE_URL}/assist/chat?mode=${currentChatMode.key}&stream=true&debug=${isDebug}`;
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
    [getAuthToken, currentChatMode, chatMessages]
  );

  useEffect(() => {
    if (
      currentChatMode &&
      chatConfig?.messageHistory &&
      isModalOpen === true &&
      messageHistoryInit === false
    ) {
      submitChatMessages(chatConfig.messageHistory);
      setMessageHistoryInit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, messageHistoryInit, chatConfig, currentChatMode]);

  useEffect(() => {
    const handleCustomEvent = (event) => {
      setChatConfig(event.detail);
      openModal();
    };

    window.addEventListener('openChatModal', handleCustomEvent);

    return () => {
      window.removeEventListener('openChatModal', handleCustomEvent);
    };
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
    const chatModeConfig = chatConfig?.chatAvailableModes.find(
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
      isOpen={isModalOpen}
      onClose={() => {
        closeModal();
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
      <ChatContainer>
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
                options={chatConfig?.chatAvailableModes.map((mode) => ({
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
            <DisclaimerText>{LEGAL_DISCLAIMER}</DisclaimerText>
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
                    onClick={() => !chatConfig?.readOnly && formik.submitForm()}
                  />
                </SubmitButtonBox>
              </InputTextWrapper>
              <ResetButtonBox>
                <FlatButton
                  label="Tip: Restart the conversation when changing the topic"
                  isDisabled={chatMessages.length === 0}
                  onClick={() => {
                    setConversationId(createNewConversationId());
                    resetChatState();
                    setReplayMessage();
                  }} // reset chat messages when clicking on the restart button
                />
              </ResetButtonBox>
            </ChatInputBox>
          )}
          {chatLocked && (
            <LockedChatFooterContainer>
              <CubeContainer>
                <CTCube />
              </CubeContainer>
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
            </LockedChatFooterContainer>
          )}
          <DisclaimerTextMobile>{LEGAL_DISCLAIMER}</DisclaimerTextMobile>
        </ChatMainArea>
        <RightBlank />
      </ChatContainer>
    </FormDialog>
  );
};

export default ChatModal;
