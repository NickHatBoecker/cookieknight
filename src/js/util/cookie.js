import config from "../config";

/**
 * Get the value of the app's cookie. You can configure its name in the config.
 */
export const getCookieData = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${config.cookieName}=`);
    if (parts.length !== 2) {
        return ''
    }

    return parts.pop().split(";").shift();
}

/**
 * Set app's cookie to hide the layer.
 */
export const setCookie = (value) => {
    let domain = ''
    if (config.cookieDomain) {
        domain = `;domain=${config.cookieDomain}`
    }
    const d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*config.cookieExpiresAfterDays);

    document.cookie = `${config.cookieName}=${value};path=/${domain};expires=${d.toGMTString()}`;
}

/**
 * Remove a cookie with given name, path and domain
 */
export const removeCookie = (cookieName, cookiePath = '', cookieDomain = '') => {
    let domain = ''
    if (cookieDomain) {
        domain = `;domain=${cookieDomain}`
    }

    document.cookie = `${cookieName}= ;path=/${cookiePath ? cookiePath : '/'}${domain};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/**
 * Generate a JSON string with all cookies.
 * Cookie title and whether the cookie was accepted or not is stored per cookie.
 */
export const generateCookieValue = (acceptedCookies) => {
    const cookieList = []

    for (let i in config.cookies) {
        const cookie = config.cookies[i]

        let cookieIsAccepted = false
        if (acceptedCookies && acceptedCookies.includes(cookie)) {
            cookieIsAccepted = true
        }

        cookieList.push({ id: cookie.id, accepted: cookieIsAccepted })
    }

    return JSON.stringify(cookieList)
}
