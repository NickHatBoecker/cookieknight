import config from "../config";

export const getLayerHtml = () => {
    return `<div id="${config.elementId}" class="cookieknight" style="display: none;">
        <button class="${config.DECLINE_ID} cookieknight__close" title="${config.declineAllText}">X</button>
        <p class="cookieknight__intro">${config.introText}</p>
        <button class="${config.ACCEPT_ALL_ID} cookieknight__btn cookieknight__btn--primary">${config.acceptAllText}</button>
        <button class="${config.ACCEPT_REQUIRED_ID} cookieknight__btn cookieknight__btn--primary">${config.acceptRequiredText}</button>
        <button class="${config.SHOW_MORE_ID} cookieknight__btn">${config.moreText}</button>
    </div>
    <dialog id="cookieknight-details" class="cookieknight-detail" style="display: none;">
        <div class="cookieknight-detail__wrapper">
            <button id="${config.CLOSE_DIALOG_ID}" class="cookieknight__close" title="${config.goBackText}">X</button>
            <p class="cookieknight-detail__headline">${config.individualCookieHeadline}</p>
            <p class="cookieknight-detail__intro">${config.individualCookieText}</p>
            
            <div class="cookieknight-detail__cookies">${getCookieHtml()}</div>
            <div class="cookieknight-detail__footer">
                <button class="${config.ACCEPT_SELECTED_ID} cookieknight__btn cookieknight__btn--primary">${config.acceptSelectedText}</button>
                <button class="${config.ACCEPT_ALL_ID} cookieknight__btn cookieknight__btn--primary">${config.acceptAllText}</button>
                <button class="${config.DECLINE_ID} cookieknight__btn">${config.declineAllText}</button>
            </div>
        </div>
    </dialog>`
}

const getCookieHtml = () => {
    if (!config.cookies.length) {
        return `<p style="font-style: italic;">No cookies configured yet.</p>`
    }

    let html = ''

    for (let i in config.cookies) {
        const cookie = config.cookies[i]
        html += `<div class="cookieknight-detail__cookie">
            <div class="cookieknight-detail__cookie__check">
                <input type="checkbox" name="acceptedCookies[]" id="acceptedCookie-${i}" class="${config.TOGGLE_COOKIE_CLASS}" data-id="${cookie.id}" />
            </div>
            <div>
                <label for="acceptedCookie-${i}" class="cookieknight-detail__cookie__headline">${cookie.title}${cookie.technicallyRequired ? ` <small class="cookieknight-detail__cookie__required">(${config.technicallyRequiredText})</small>` : ''}</label>
                <p class="cookieknight-detail__cookie__purpose">${config.purposeText}: ${cookie.purpose}</p>
            </div>
        </div>`
    }

    return html
}
