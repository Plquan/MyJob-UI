export const getCookie = (cookieName: string): string | undefined => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : undefined;
  };
  
  export const setCookie = (
    cookieName: string,
    value: string,
    expireInSeconds: number = 8640000
  ): void => {
    const expires = new Date(Date.now() + expireInSeconds * 1000);
    document.cookie = `${cookieName}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
  };
  
  export const deleteCookie = (cookieName: string): void => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };
  