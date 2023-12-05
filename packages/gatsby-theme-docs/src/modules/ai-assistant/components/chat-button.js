import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useAuthentication from '../../sso/hooks/use-authentication';
import { useAuthToken } from '../../self-learning/hooks/use-auth-token';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { CHAT_API_BASE_URL } from './chat.const';
import { isAllowedUser, isNotValidatedUser } from './chat.utils';

const ChatButton = (props) => {
  const { isAuthenticated, user } = useAuthentication();
  const [chatLoading, setChatLoading] = useState(false);
  const { getAuthToken } = useAuthToken();

  const chatInit = useCallback(
    async (config) => {
      const apiEndpoint = `${CHAT_API_BASE_URL}/assist/init`;
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
    [getAuthToken]
  );

  const handleClick = async () => {
    if (isAuthenticated && isAllowedUser(user)) {
      setChatLoading(true);
      // TODO: call the /init endpoint
      const modes = await chatInit({
        mode: props.mode,
        messageHistory: props.messageHistory,
      });
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
    }
  };

  if (isAuthenticated && isAllowedUser(user)) {
    return (
      <SecondaryButton
        label={props.label}
        onClick={handleClick}
        isDisabled={chatLoading}
      />
    );
  } else if (isAuthenticated && isNotValidatedUser(user)) {
    return (
      <>
        <h3>Verify your account to use commercetools Assistant</h3>
        <p>
          Your account is not verified. Check your inbox for the verification
          email and click on the link attached.
        </p>
        <h4>Link expired? Follow the steps below:</h4>
        <ol css={{ 'padding-left': '20px' }}>
          <li>
            Click on the avatar with your initials located on top of this page.
          </li>
          <li>Click the &quot;Verify Email&quot; button.</li>
          <li>
            Check your inbox for the verification email and click on the link
            attached.
          </li>
        </ol>
      </>
    );
  } else {
    return null;
  }
};

ChatButton.propTypes = {
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

export default ChatButton;
