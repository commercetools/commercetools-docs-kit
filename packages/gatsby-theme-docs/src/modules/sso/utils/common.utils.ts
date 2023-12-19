import { cleanupAIAssistantData } from '../../ai-assistant/components/chat.utils';

export const getCookieValue = (cookieName: string): string | undefined => {
  const cookieValue = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${cookieName}=`));
  if (cookieValue) {
    return cookieValue.substring(cookieName.length + 1);
  }
};

/** Gets triggered when user clicks logout */
export const onLogout = (): void => {
  cleanupAIAssistantData();
};
