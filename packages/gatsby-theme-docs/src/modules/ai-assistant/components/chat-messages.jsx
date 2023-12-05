import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Avatar from '@commercetools-uikit/avatar';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import {
  markdownFragmentToReact,
  MultiCodeBlockMarkdownWrapper,
  ContentNotifications,
  designSystem,
} from '@commercetools-docs/ui-kit';
import { FirstName } from '@commercetools-docs/gatsby-theme-docs';
import { CHAT_ROLE_ASSISTANT, CHAT_ROLE_USER } from './chat.const';
import { getAssistantAvatarIcon } from './chat.utils';
import thumbsUpIcon from '../icons/assistant-thumbs-up.png';
import thumbsDownIcon from '../icons/assistant-thumbs-down.png'
import thumbsUpIconFilled from '../icons/assistant-thumbs-up-filled.png'
import thumbsDownIconFilled from '../icons/assistant-thumbs-down-filled.png'
import codeIcon from '../icons/assistant-code.png'
import { DEV_TOOLING_MODE } from './chat-modal';

export const FEEDBACK_UP = 1;
export const FEEDBACK_DOWN = -1;

const MessageContainer = styled.div`
  font-size: ${designSystem.typography.fontSizes.small};
  line-height: 22px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 15vh;
  svg {
    height: 50px;
    width: 50px;
  }
`;

const CodeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46vh;
`;

const AvatarWrapper = styled.div`
  flex-shrink: 0;
  padding: ${(props) => (props.isAssistant ? '0px' : '10px')};
  border: 1px solid #999999;
  border-radius: 16px;
  svg {
    height: 60px;
    width: 60px;
  }
`;

const MessageText = styled.div`
  margin-left: 10px;
  padding-top: 2px;
  line-height: 22px;
  font-size: 14px;
  p {
    display: inline;
  }
`;

const IntroMessageText = styled(MessageText)`
  p {
    display: inline;
  }
`;

const FeedbackWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ThumbsDownButton = styled.button`
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
  background: transparent;
  height: 28px;
  width: 28px;
  border: 0;
  padding: 3px;
  margin-right: 8px;
  img {
    transform: scaleX(-1);
  }
  :focus {
    outline: none;
  }
`;

const ThumbsUpButton = styled.button`
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
  background: transparent;
  height: 28px;
  width: 28px;
  border: 0;
  padding: 3px;
  :focus {
    outline: none;
  }
`;

const ChatMessages = (props) => {
  const [feedbackResults, setFeedbackResults] = useState({});
  const AssistantAvatarIcon =
    props?.chatMode?.key && getAssistantAvatarIcon(props.chatMode.key);

  const handleThumbsClick = (e, messageId, feedback) => {
    const customEvent = new CustomEvent('openChatFeedbackModal', {
      detail: {
        feedback,
        messageId,
        conversationId: props.conversationId,
        feedbackResults,
        setFeedbackResults,
      },
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(customEvent);
  };

  return props.chatMode ? (
    <>
      <MessageContainer>
        <ContentNotifications.Info>
          {props.chatMode.disclaimer}
        </ContentNotifications.Info>
      </MessageContainer>
      <MessageContainer>
        <AvatarWrapper isAssistant>
          <AssistantAvatarIcon />
        </AvatarWrapper>
        <IntroMessageText>
          Hello <FirstName />, {markdownFragmentToReact(props.chatMode.intro)}
        </IntroMessageText>
      </MessageContainer>
      {props.messages.map((message, index) => (
        <>
          <MessageContainer key={index}>
            {message.role === 'assistant' ? (
              <AvatarWrapper isAssistant>
                <AssistantAvatarIcon />
              </AvatarWrapper>
            ) : (
              <AvatarWrapper>
                <Avatar size="m" firstName={message.name} gravatarHash="" />
              </AvatarWrapper>
            )}
            <MessageText>
              {markdownFragmentToReact(message.content, {
                pre: MultiCodeBlockMarkdownWrapper,
              })}
              {!props.isLoading &&
                index === props.messages.length - 1 &&
                props.references.length > 0 &&
                props.isDebug &&
                markdownFragmentToReact(
                  `\`\`\`json\n\n${JSON.stringify(
                    props.references,
                    null,
                    2
                  )}\n\`\`\``,
                  {
                    pre: MultiCodeBlockMarkdownWrapper,
                  }
                )}
            </MessageText>
          </MessageContainer>

          {message.role === 'assistant' ? (
            <FeedbackWrapper>
              <ThumbsUpButton
                isClickable={!feedbackResults[message.id]}
                onClick={
                  !feedbackResults[message.id]
                    ? (e) => handleThumbsClick(e, message.id, FEEDBACK_UP)
                    : null
                }
              >
                <img
                  alt='positive feedback'
                  src={
                    feedbackResults[message.id] === FEEDBACK_UP
                      ? thumbsUpIconFilled
                      : thumbsUpIcon
                  }
                  width={18}
                />
              </ThumbsUpButton>
              <ThumbsDownButton
                isClickable={!feedbackResults[message.id]}
                onClick={
                  !feedbackResults[message.id]
                    ? (e) => handleThumbsClick(e, message.id, FEEDBACK_DOWN)
                    : null
                }
              >
                <img
                  alt='negative feedback'
                  src={
                    feedbackResults[message.id] === FEEDBACK_DOWN
                      ? thumbsDownIconFilled
                      : thumbsDownIcon
                  }
                  width={18}
                />
              </ThumbsDownButton>
            </FeedbackWrapper>
          ) : null}
        </>
      ))}
      {props.chatLocked && (
        <MessageContainer>
          <ContentNotifications.Info>
            To ensure high quality of my responses, I cannot answer any follow
            up questions. However, you can restart this conversation to refine
            the responses.
          </ContentNotifications.Info>
        </MessageContainer>
      )}
      {props.isLoading && (
        <LoadingContainer>
          <LoadingSpinner scale="l" maxDelayDuration={0} />
        </LoadingContainer>
      )}
      {props.messages.length === 0 &&
        props.chatMode.key === DEV_TOOLING_MODE && (
          <CodeContainer>
            <img src={codeIcon} width={300} alt="code assistant icon"/>
          </CodeContainer>
        )}
    </>
  ) : null;
};

ChatMessages.propTypes = {
  isLoading: PropTypes.bool,
  conversationId: PropTypes.string,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      role: PropTypes.oneOf([CHAT_ROLE_USER, ...CHAT_ROLE_ASSISTANT])
        .isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  references: PropTypes.arrayOf(
    PropTypes.shape({
      contentType: PropTypes.string,
      url: PropTypes.string,
      urn: PropTypes.string,
      title: PropTypes.string,
      typeName: PropTypes.string,
      api: PropTypes.string,
      products: PropTypes.arrayOf(PropTypes.string),
      microsite: PropTypes.string,
      codeRemoved: PropTypes.boolean,
      tokenCount: PropTypes.string,
      usedInSystemPrompt: PropTypes.boolean,
      similarityScore: PropTypes.number,
    })
  ).isRequired,
  chatMode: PropTypes.shape({
    botName: PropTypes.string.isRequired,
    disclaimer: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    output: PropTypes.oneOf(['markdown']).isRequired,
  }),
  chatLocked: PropTypes.bool.isRequired,
  isDebug: PropTypes.bool,
};

export default ChatMessages;
