import PropTypes from 'prop-types';
import SecondaryButton from '../../sso/components/secondary-button';

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
    <SecondaryButton
      onClick={handleClick}
      data-testid="ai-assistant-launch-button"
    >
      {props.label}
    </SecondaryButton>
  );
};

AiAssistantLaunchButton.propTypes = {
  label: PropTypes.string.isRequired,
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
