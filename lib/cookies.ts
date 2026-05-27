import { Cookies } from 'wxt/browser';

export interface CookieFilter {
  domain?: string;
  name?: string;
}

export const getAllCookies = async (filter?: CookieFilter): Promise<Cookies.Cookie[]> => {
  return await browser.cookies.getAll(filter || {});
};

export const setCookie = async (details: Cookies.SetDetails): Promise<Cookies.Cookie | null> => {
  return await browser.cookies.set(details);
};

export const removeCookie = async (details: Cookies.RemoveDetails): Promise<Cookies.RemoveCallbackDetails | null> => {
  return await browser.cookies.remove(details);
};

export const exportCookies = (cookies: Cookies.Cookie[]): string => {
  return JSON.stringify(cookies, null, 2);
};

export const importCookies = async (json: string): Promise<{ success: number; failed: number }> => {
  try {
    const cookies = JSON.parse(json) as Cookies.Cookie[];
    let success = 0;
    let failed = 0;

    for (const cookie of cookies) {
      try {
        const { hostOnly, session, ...setDetails } = cookie as any;
        
        // Construct proper URL for setting the cookie
        const protocol = setDetails.secure ? 'https://' : 'http://';
        const domain = setDetails.domain.startsWith('.') ? setDetails.domain.substring(1) : setDetails.domain;
        const url = `${protocol}${domain}${setDetails.path}`;
        
        await browser.cookies.set({
          url,
          name: setDetails.name,
          value: setDetails.value,
          domain: setDetails.domain,
          path: setDetails.path,
          secure: setDetails.secure,
          httpOnly: setDetails.httpOnly,
          expirationDate: setDetails.expirationDate,
          sameSite: setDetails.sameSite,
          storeId: setDetails.storeId,
        });
        success++;
      } catch (e) {
        console.error('Failed to import cookie:', cookie, e);
        failed++;
      }
    }
    return { success, failed };
  } catch (e) {
    console.error('Invalid JSON for cookie import:', e);
    throw new Error('Invalid JSON format');
  }
};
