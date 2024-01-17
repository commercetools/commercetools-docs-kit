import PropTypes from 'prop-types';
import LoginButton from '../../sso/components/login-button';
import robotPng from '../icons/robot.png';
import LegalDisclaimer from './chat-modal-legal-disclaimer';
import {
  BackgroundWrapper,
  ChatBottomContainer,
  ChatContainer,
  ChatMainArea,
  ChatMainAreaWhenLoggedOut,
  ChatSideArea,
  DisclaimerText,
  LeftBlank,
  RightBlank,
  SideTopContainer,
} from './chat-modal-css-components';

const ChatModalLoggedOut = (props) => {
  return (
    <ChatContainer data-testid="ai-assistant-modal">
      <LeftBlank />
      <ChatSideArea>
        <SideTopContainer>
          <BackgroundWrapper>
            <img src={robotPng} width={400} alt="robot icon" />
          </BackgroundWrapper>
        </SideTopContainer>
        <ChatBottomContainer>
          <DisclaimerText>
            <LegalDisclaimer />
          </DisclaimerText>
        </ChatBottomContainer>
      </ChatSideArea>
      <ChatMainArea>
        <ChatMainAreaWhenLoggedOut>
          {props.aiAssistantCfg && (
            <LoginButton
              theme="primary"
              label="Log in to start the Assistant"
              aiAssistantCfg={props.aiAssistantCfg}
              data-testid="ai-chat-login-button"
            />
          )}
        </ChatMainAreaWhenLoggedOut>
      </ChatMainArea>
      <RightBlank />
    </ChatContainer>
  );
};

export default ChatModalLoggedOut;

ChatModalLoggedOut.propTypes = {
  aiAssistantCfg: PropTypes.shape({
    chatSelectedMode: PropTypes.string,
    isDismissable: PropTypes.bool,
    messageHistory: PropTypes.arrayOf(
      PropTypes.shape({ role: PropTypes.string, value: PropTypes.string })
    ),
    title: PropTypes.string,
    readOnly: PropTypes.bool,
  }),
};
