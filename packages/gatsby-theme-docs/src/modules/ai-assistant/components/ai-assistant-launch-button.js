import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import useAuthentication from '../../sso/hooks/use-authentication';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';
import ConfigContext from '../../../components/config-context';
import { isNotValidatedUser } from './chat.utils';
import SecondaryButton from '../../sso/components/secondary-button';

const AiAssistantLaunchButton = (props) => {
  const { isAuthenticated, user } = useAuthentication();
  const [chatLoading, setChatLoading] = useState(false);
  const { aiAssistantApiBaseUrl } = useContext(ConfigContext);
  const { getAuthToken } = useAuthToken();

  const chatInit = useCallback(
    async (config) => {
      const apiEndpoint = `${aiAssistantApiBaseUrl}/api/assist/init`;
      const accessToken = await getAuthToken();
      try {
        const data = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        return await data.json();
      } catch (error) {
        return undefined;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getAuthToken, aiAssistantApiBaseUrl]
  );

  const handleClick = async () => {
    setChatLoading(true);
    // TODO: call the /init endpoint
    const modes =
      isAuthenticated && !isNotValidatedUser(user)
        ? await chatInit({
            mode: props.mode,
            messageHistory: props.messageHistory,
          })
        : null;
    const customEvent = new CustomEvent('openChatModal', {
      detail: {
        title: 'Chat assistant',
        isDismissable: true,
        chatSelectedMode: props.mode,
        chatAvailableModes: modes?.modes || [],
        messageHistory: props.messageHistory,
        readOnly: props.readOnly,
      },
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(customEvent);
    setChatLoading(false);
  };

  return (
    <SecondaryButton
      onClick={handleClick}
      disabled={chatLoading}
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
