import PropTypes from 'prop-types';
import useAuthentication from '../modules/sso/hooks/use-authentication';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { useState } from 'react';

const chatInit = async (config) => {
  // TODO: call init endpoint
  return ['mode1', 'mode2', 'mode3'];
};

const ChatButton = (props) => {
  // TODO: isAuthenticated is enough?
  const { isAuthenticated } = useAuthentication();
  const [chatLoading, setChatLoading] = useState(false);

  const handleClick = async () => {
    if (isAuthenticated) {
      setChatLoading(true);
      console.log(`Launching chat in mode ${props.mode}`);
      // TODO: call the /init endpoint
      const modes = await chatInit({
        mode: props.mode,
        messageHistory: props.messageHistory,
      });
      console.log(modes);
      setChatLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <SecondaryButton
        label={props.label}
        onClick={handleClick}
        isDisabled={chatLoading}
      />
    );
  } else {
    return null;
  }
};

ChatButton.propTypes = {
  label: PropTypes.string.isRequired,
  messageHistory: PropTypes.arrayOf(PropTypes.string),
  mode: PropTypes.string,
};

export default ChatButton;
