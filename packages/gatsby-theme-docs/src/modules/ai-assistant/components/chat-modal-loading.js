import LegalDisclaimer from './chat-modal-legal-disclaimer';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

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

const ChatModalLoading = (props) => {
  return (
    <ChatContainer data-testid="ai-assistant-modal">
      <LeftBlank />
      <ChatSideArea>
        <SideTopContainer>
          <BackgroundWrapper />
        </SideTopContainer>
        <ChatBottomContainer>
          <DisclaimerText>
            <LegalDisclaimer />
          </DisclaimerText>
        </ChatBottomContainer>
      </ChatSideArea>
      <ChatMainArea>
        <ChatMainAreaWhenLoggedOut>
          <LoadingSpinner scale="l" />
        </ChatMainAreaWhenLoggedOut>
      </ChatMainArea>
      <RightBlank />
    </ChatContainer>
  );
};

export default ChatModalLoading;
