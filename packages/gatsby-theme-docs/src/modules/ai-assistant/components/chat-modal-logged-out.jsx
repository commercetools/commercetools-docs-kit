import React from 'react';
import { LoginButton } from '../../sso';
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

const ChatModalLoggedOut = () => {
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
          <LoginButton theme="primary" label="Log in to start the Assistant" />
        </ChatMainAreaWhenLoggedOut>
      </ChatMainArea>
      <RightBlank />
    </ChatContainer>
  );
};

export default ChatModalLoggedOut;
