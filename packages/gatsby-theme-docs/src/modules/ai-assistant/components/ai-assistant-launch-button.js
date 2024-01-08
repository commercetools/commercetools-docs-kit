import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import IconButton from '@commercetools-uikit/icon-button';
import AssistantIcon from '../icons/assistant-icon.svg';

const AssistantLaunchContainer = styled.div`
  button {
    :focus {
      outline: none;
    }
  }
`;

const AiAssistantLaunchButton = (props) => {
  const handleClick = () => {
    const customEvent = new CustomEvent('openChatModal', {
      detail: {
        title: 'Chat assistant',
        isDismissable: true,
        chatSelectedMode: props.mode,
        messageHistory: props.messageHistory,
        readOnly: props.readOnly,
      },
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <AssistantLaunchContainer>
      <IconButton
        icon={<AssistantIcon />}
        size="big"
        label="Open AI assistant"
        onClick={handleClick}
        data-testid="ai-assistant-launch-button"
      />
    </AssistantLaunchContainer>
  );
};

AiAssistantLaunchButton.propTypes = {
  messageHistory: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  readOnly: PropTypes.bool,
  mode: PropTypes.string,
};

export default AiAssistantLaunchButton;
