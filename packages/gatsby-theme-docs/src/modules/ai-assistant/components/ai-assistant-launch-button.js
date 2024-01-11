import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import IconButton from '@commercetools-uikit/icon-button';
import AssistantIcon from '../icons/assistant-icon.svg';
import SecondaryButton from '../../sso/components/secondary-button';
import { gtagEvent } from '../../sso';

const AssistantLaunchContainer = styled.div`
  button {
    border: none;
    :focus {
      outline: none;
    }
  }
`;

const AiAssistantLaunchButton = (props) => {
  const handleClick = (details) => {
    gtagEvent('ai_assistant_launch', {
      mode: props.mode,
      ...details,
    });
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

  return props.label ? (
    <SecondaryButton
      onClick={() =>
        handleClick({
          launch_location: 'page_content',
          button_label: props.label,
        })
      }
      data-testid="ai-assistant-launch-button"
    >
      {props.label}
    </SecondaryButton>
  ) : (
    <AssistantLaunchContainer>
      <IconButton
        icon={<AssistantIcon />}
        size="big"
        label="Open AI assistant"
        onClick={() => handleClick({ launch_location: 'topbar' })}
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
  label: PropTypes.string,
};

export default AiAssistantLaunchButton;
