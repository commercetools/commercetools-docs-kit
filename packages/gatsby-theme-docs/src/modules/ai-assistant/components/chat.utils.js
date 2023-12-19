import {
  ALLOWED_EMAIL_DOMAINS,
  LOCAL_AI_ASSISTANT_STATE_KEY,
} from './chat.const';
import DefaultAvatarIcon from '../icons/assistant-avatar.svg';
import ChefAvatarIcon from '../icons/assistant-chef.svg';
import { DEV_TOOLING_MODE } from './chat-modal';

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

export const isAllowedUser = (user) => {
  return user && user.email_verified && isAllowedEmailDomain(user.email);
};

export const isNotValidatedUser = (user) => {
  return user && !user.email_verified && isAllowedEmailDomain(user.email);
};

/**
 * Check if the user belongs strictly to commercetools.com (regardless of the ALLOWED_EMAIL_DOMAINS config ).
 * This is used to enable features visible only to commercetools.com users
 */
export const isCtUser = (user) => {
  return (
    user &&
    user.email_verified &&
    isAllowedEmailDomain(user.email, ['commercetools.com'])
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
 * otherwise undefined will be returned
 */
export const loadLocalChatState = (mode) => {
  const chatState = localStorage.getItem(LOCAL_AI_ASSISTANT_STATE_KEY);
  if (chatState) {
    const chatStateObject = JSON.parse(chatState);
    if (chatState?.chatSelectedMode !== mode) {
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
  let newLocalState = { messages: [], references: [], isLocked: false };
  if (chatState) {
    const chatStateObject = JSON.parse(chatState);
    newLocalState = {
      ...chatStateObject,
      [propertyName]: propertyValue,
    };
  }
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
