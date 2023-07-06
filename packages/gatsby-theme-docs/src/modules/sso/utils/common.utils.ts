export const getCookieValue = (cookieName: string): string | undefined => {
  const cookieValue = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${cookieName}=`));
  if (cookieValue) {
    return cookieValue.substring(cookieName.length + 1);
  }
};
