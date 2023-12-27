import React from 'react';
import Spacings from '@commercetools-uikit/spacings';
import { ContentNotifications } from '@commercetools-docs/ui-kit';
import { VerifyButton } from '../../sso';
import robotPng from '../icons/robot.png';
import CTCube from '../icons/black-white-ct-cube.svg';
import LegalDisclaimer from './chat-modal-legal-disclaimer';
import {
  BackgroundWrapper,
  ChatBottomContainer,
  ChatContainer,
  ChatMainArea,
  ChatMessagesWrapper,
  ChatSideArea,
  CubeContainer,
  DisclaimerText,
  LeftBlank,
  LockedChatFooterContainer,
  NotificationListText,
  NotificationTextBig,
  NotificationTextSmall,
  ResetButtonBox,
  RightBlank,
  SideTopContainer,
} from './chat-modal-css-components';

const NOT_VERIFIED_INFO = (
  <ContentNotifications.Info>
    <Spacings.Stack scale="l">
      <NotificationTextBig>
        Verify your email to use the commercetools Assistant.
      </NotificationTextBig>
      <NotificationTextSmall>
        Your commercetools ID account is not verified.{' '}
        <b>
          Check your inbox for the verification email and click on the link
          attached.
        </b>
      </NotificationTextSmall>
      <Spacings.Stack scale="s">
        <NotificationTextBig>
          Link expired? Follow the steps below:
        </NotificationTextBig>
        <NotificationListText>
          1. Click on the button below to open a modal.
        </NotificationListText>
        <NotificationListText>
          2. Once open, click the “Verify Email” button.
        </NotificationListText>
        <NotificationListText>
          3. Check your inbox for the verification email and click on the link
          attached.
        </NotificationListText>
      </Spacings.Stack>
    </Spacings.Stack>
  </ContentNotifications.Info>
);

const ChatModalNotVerified = () => {
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
        <ChatMessagesWrapper>{NOT_VERIFIED_INFO}</ChatMessagesWrapper>
        <LockedChatFooterContainer>
          <ResetButtonBox>
            <VerifyButton label="Verify your email" />
          </ResetButtonBox>
          <CubeContainer>
            <CTCube />
          </CubeContainer>
        </LockedChatFooterContainer>
      </ChatMainArea>
      <RightBlank />
    </ChatContainer>
  );
};

export default ChatModalNotVerified;
