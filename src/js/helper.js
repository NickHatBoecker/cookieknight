import { removeCookie, getCookieData } from "./util/cookie";
import { getClosest } from "./util/utils";
import config from "./config";
import { resetLayer } from "./layer";

/**
 * Toggle cookie checkboxes on page load
 */
export const loadCookieConfig = () => {
    resetLayer()

    const cookieData = getCookieData()
    if (!cookieData) {
        return
    }

    const cookieList = JSON.parse(cookieData)
    cookieList.forEach((cookie) => {
        if (!cookie.accepted) {
            return
        }

        const checkbox = document.querySelector(`[data-id="${cookie.id}"]`)
        if (!checkbox) {
            return
        }
        const parent = getClosest(checkbox, '.cookieknight-detail__cookie')

        // Mark cookie checked
        checkbox.checked = true
        parent.classList.add('cookieknight-detail__cookie__checked')
    })
}

export const initScripts = () => {
    const scriptList = document.querySelectorAll(`[data-cookie]`)
    scriptList.forEach((script) => {
        const cookieId = script.dataset.cookie
        const cookie = JSON.parse(getCookieData()).find(x => x.id === cookieId)
        if (!cookie || !cookie.accepted) {
            return
        }

        const newScript = document.createElement('script')

        if (script.dataset.src) {
            newScript.setAttribute('src', script.dataset.src)
        }
        if (script.dataset.type) {
            newScript.setAttribute('type', script.dataset.type)
            newScript.innerHTML = script.innerHTML
        }

        document.body.appendChild(newScript)
        script.remove()
    })

    config.cookies.forEach(cookie => {
        const isAccepted = JSON.parse(getCookieData()).find(x => x.id === cookie.id).accepted || false
        if (isAccepted || !cookie.cookies) {
            return
        }

        cookie.cookies.forEach(cookieData => {
            if (typeof cookieData === 'string') {
                removeCookie(cookieData)
            } else {
                removeCookie(cookieData.name, cookieData.path, cookieData.domain)
            }
        })
    })
}

export const getSelectedCookies = () => {
    const selectedCookies = []

    Array.from(document.getElementsByClassName(config.TOGGLE_COOKIE_CLASS)).forEach(function (checkbox) {
        if (!checkbox.checked) {
            return
        }

        const cookieId = checkbox.dataset.id
        const cookie = config.cookies.find(x => x.id === cookieId)

        selectedCookies.push(cookie)
    })

    return selectedCookies
}

export function toggleCookie () {
    const parent = getClosest(this, '.cookieknight-detail__cookie')

    if (this.checked) {
        parent.classList.add('cookieknight-detail__cookie__checked')
    } else {
        parent.classList.remove('cookieknight-detail__cookie__checked')
    }
}
