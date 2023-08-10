import styled from '@emotion/styled';
import Avatar from '@commercetools-uikit/avatar';

type Message = {
  from: string;
  text: string;
};
type ChatMessageHistoryProps = {
  messages: Message[];
};

const ChatContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

type MessageContainerProps = {
  isEven: boolean;
};

const MessageContainer = styled.div<MessageContainerProps>`
  background-color: ${(props) =>
    props.isEven ? '#f0f0f0' : '#ffffff'}; /* Alternate background colors */
  display: flex;
  align-items: center;
  padding: 8px;
`;

const MessageText = styled.div`
  margin-left: 10px;
  padding: 8px;
  border-radius: 8px;
`;

const ChatMessageHistory = (props: ChatMessageHistoryProps) => {
  return (
    <ChatContainer>
      {props.messages.map((message, index) => (
        <MessageContainer key={index} isEven={index % 2 === 0}>
          <Avatar size="m" firstName={message.from} gravatarHash="" />
          <MessageText>{message.text}</MessageText>
        </MessageContainer>
      ))}
    </ChatContainer>
  );
};

export default ChatMessageHistory;
