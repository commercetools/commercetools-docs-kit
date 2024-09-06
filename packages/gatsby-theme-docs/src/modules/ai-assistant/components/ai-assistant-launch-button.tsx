import styled from '@emotion/styled';
import IconButton from '@commercetools-uikit/icon-button';
import Tooltip from '@commercetools-uikit/tooltip';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import AssistantIcon from '../icons/assistant-icon.svg';
import { gtagEvent } from '../../sso/utils/analytics.utils';

const AssistantLaunchContainer = styled.div`
  button {
    border: none;
    :focus {
      outline: none;
    }
  }
`;
type MessageHistory = {
  role: string;
  content: string;
};
type AiAssistantLaunchButtonProps = {
  messageHistory: MessageHistory[];
  readOnly?: boolean;
  mode?: string;
  label?: string;
};

const AiAssistantLaunchButton = (props: AiAssistantLaunchButtonProps) => {
  const handleClick = (details: Record<string, unknown>) => {
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
      label={props.label}
    />
  ) : (
    <AssistantLaunchContainer>
      <Tooltip title="AI Assistant">
        <IconButton
          icon={<AssistantIcon />}
          size="40"
          label="Open AI assistant"
          onClick={() => handleClick({ launch_location: 'topbar' })}
          data-testid="ai-assistant-launch-button"
        />
      </Tooltip>
    </AssistantLaunchContainer>
  );
};

export default AiAssistantLaunchButton;
