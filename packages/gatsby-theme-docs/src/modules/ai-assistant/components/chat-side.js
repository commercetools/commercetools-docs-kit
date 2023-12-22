import PropTypes from 'prop-types';
import { isCtUser } from './chat.utils';
import robotPng from '../icons/robot.png';
import { DEV_TOOLING_MODE } from './chat-modal';
import {
  BackgroundWrapper,
  ChatBottomContainer,
  DisclaimerText,
  SideDebugContainer,
  SideTopContainer,
  ChatSideArea,
} from './chat-modal-css-components';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import SelectField from '@commercetools-uikit/select-field';
import CodeGeneratorSidebar from './code-generator-sidebar';
import ReferencesList from './chat-references-list';
import LegalDisclaimer from './chat-modal-legal-disclaimer';

const ChatSide = (props) => {
  return (
    <ChatSideArea>
      {isCtUser(props.user) && (
        <SideDebugContainer>
          <CheckboxInput
            isChecked={props.debugMode === true}
            name="debugMode"
            onChange={props.handleChatDebugModeChange}
          >
            Debug mode
          </CheckboxInput>
          <SelectField
            title=""
            value={props.chatMode}
            options={props.chatAvailableModes.map((mode) => ({
              value: mode.key,
              label: mode.label,
            }))}
            onChange={props.handleChatModeChange}
          />
        </SideDebugContainer>
      )}
      <SideTopContainer>
        {props.currentChatMode?.key === DEV_TOOLING_MODE ? (
          <CodeGeneratorSidebar
            onQuestionClick={props.handleQuestionButtonClicked}
          />
        ) : props.chatReferences.length > 0 ? (
          <ReferencesList references={props.chatReferences}></ReferencesList>
        ) : (
          <BackgroundWrapper>
            <img src={robotPng} width={400} alt="robot icon" />
          </BackgroundWrapper>
        )}
      </SideTopContainer>
      <ChatBottomContainer>
        <DisclaimerText>
          <LegalDisclaimer />
        </DisclaimerText>
      </ChatBottomContainer>
    </ChatSideArea>
  );
};

ChatSide.propTypes = {
  user: PropTypes.object,
  debugMode: PropTypes.bool,
  chatMode: PropTypes.string,
  handleChatDebugModeChange: PropTypes.func,
  handleChatModeChange: PropTypes.func,
  handleQuestionButtonClicked: PropTypes.func,
  chatAvailableModes: PropTypes.arrayOf(PropTypes.object),
  currentChatMode: PropTypes.object,
  chatReferences: PropTypes.arrayOf(PropTypes.object),
};

export default ChatSide;
