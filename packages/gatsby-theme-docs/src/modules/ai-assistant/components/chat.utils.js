import {
  ALLOWED_EMAIL_DOMAINS,
  LOCAL_AI_ASSISTANT_STATE_KEY,
} from './chat.const';
import DefaultAvatarIcon from '../icons/assistant-avatar.svg';
import ChefAvatarIcon from '../icons/assistant-chef.svg';
import { DEV_TOOLING_MODE } from './chat-modal';
import { AI_ASSISTANT_LOCALSTORAGE_POST_LOGIN_KEY } from '../hooks/use-ai-assistant';

export const isWaitingChunk = (chunk) => chunk === ' ';
export const cleanupResponse = (chunk) => chunk.trim();

const escapeRegExp = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const isAllowedEmailDomain = (email, domainList) => {
  const domainPattern = (domainList || ALLOWED_EMAIL_DOMAINS)
    .map((domain) => `(${escapeRegExp(domain)})`)
    .join('|');
  const allowedEmailDomainRegExp = new RegExp(
    `^[a-zA-Z0-9._%+-]+@(${domainPattern})$`
  );
  return allowedEmailDomainRegExp.test(email);
};

export const isNotValidatedUser = (user) => {
  return user && !user.email_verified && isAllowedEmailDomain(user.email);
};

/**
 * Check if the user belongs to the +test@commercetools.com email aliases. These users will have access
 * to special debug features such as ai assistant mode switcher and debug output
 */
export const isCtDebugUser = (user) => {
  return (
    user &&
    user.email_verified &&
    user.email.endsWith('+test@commercetools.com')
  );
};

/** Returns the appropriate assistant avatar icon based on the chat mode to be extended */

export const getAssistantAvatarIcon = (mode) => {
  switch (mode) {
    case DEV_TOOLING_MODE:
      return ChefAvatarIcon;
    default:
      return DefaultAvatarIcon;
  }
};

/**
 * If a chat state exists in the local storage, and it's valid (same selected mode), it will be returned,
 * otherwise undefined will be returned. If a messageHistory is passed as parameter when chat launches, the
 * localstorage is also reset
 */
export const loadLocalChatState = ({ chatSelectedMode, messageHistory }) => {
  const chatState = localStorage.getItem(LOCAL_AI_ASSISTANT_STATE_KEY);
  if (chatState) {
    const chatStateObject = JSON.parse(chatState);
    if (
      chatStateObject?.mode?.key !== chatSelectedMode ||
      (messageHistory && messageHistory.length > 0)
    ) {
      // chat mode has been changed
      // reset localstorage and returns undefined
      localStorage.removeItem(LOCAL_AI_ASSISTANT_STATE_KEY);
      return;
    } else {
      return chatStateObject;
    }
  }
  return;
};

const setLocalStorageProperty = (propertyName, propertyValue) => {
  const chatState = localStorage.getItem(LOCAL_AI_ASSISTANT_STATE_KEY);
  const chatStateObject = chatState
    ? JSON.parse(chatState)
    : {
        messages: [],
        references: [],
        isLocked: false,
        mode: {},
      };

  const newLocalState = {
    ...chatStateObject,
    [propertyName]: propertyValue,
  };
  localStorage.setItem(
    LOCAL_AI_ASSISTANT_STATE_KEY,
    JSON.stringify(newLocalState)
  );
};

export const setLocalStorageMessages = (messages) => {
  setLocalStorageProperty('messages', messages);
};

export const setLocalStorageReferences = (references) => {
  setLocalStorageProperty('references', references);
};

export const setLocalStorageChatLocked = (isLocked) => {
  setLocalStorageProperty('isLocked', isLocked);
};

export const setLocalStorageChatMode = (mode) => {
  setLocalStorageProperty('mode', mode);
};

export const cleanupAIAssistantData = () => {
  localStorage.removeItem(LOCAL_AI_ASSISTANT_STATE_KEY);
  localStorage.removeItem(AI_ASSISTANT_LOCALSTORAGE_POST_LOGIN_KEY);
};

/**
 * Ensures that the reference's breadcrumbs are displaying root group
 * only if available, otherwise display the microsite only
 */
export const createReferenceGroup = (
  micrositeBreadcrumb,
  formattedMicrositeName
) =>
  micrositeBreadcrumb && micrositeBreadcrumb !== ''
    ? `${micrositeBreadcrumb} > ${formattedMicrositeName}`
    : `${formattedMicrositeName}`;
