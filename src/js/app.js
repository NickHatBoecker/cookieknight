import '../scss/app.scss'
import config from './config.js'

import { generateCookieValue, getCookieData, setCookie } from "./util/cookie";
import { hideLayer, hideDetails, openDialog, closeDialog, closeDialogShowLayer } from "./layer";
import { getLayerHtml } from "./util/template";
import { loadCookieConfig, initScripts, getSelectedCookies, toggleCookie } from "./helper";

let acceptedCookies = []

window.onload = () => {
    init()
}

/**
 * Init the app's layer.
 */
const init = () => {
    document.body.innerHTML = document.body.innerHTML + getLayerHtml();

    const cookieData = getCookieData()

    if (cookieData) {
        loadCookieConfig()
        initScripts()
    } else {
        document.getElementById(config.elementId).style.display = 'block'
    }

    // Event listeners
    document.getElementById(config.CLOSE_DIALOG_ID).addEventListener('click', cookieData ? closeDialog : closeDialogShowLayer)

    Array.from(document.getElementsByClassName(config.SHOW_MORE_ID)).forEach(function (element) {
        element.addEventListener('click', openDialog);
    })
    Array.from(document.getElementsByClassName(config.ACCEPT_ALL_ID)).forEach(function (element) {
        element.addEventListener('click', acceptAll);
    })
    Array.from(document.getElementsByClassName(config.ACCEPT_REQUIRED_ID)).forEach(function (element) {
        element.addEventListener('click', acceptRequired);
    })
    Array.from(document.getElementsByClassName(config.ACCEPT_SELECTED_ID)).forEach(function (element) {
        element.addEventListener('click', acceptSelected);
    })
    Array.from(document.getElementsByClassName(config.DECLINE_ID)).forEach(function (element) {
        element.addEventListener('click', declineAll);
    })
    Array.from(document.getElementsByClassName(config.TOGGLE_COOKIE_CLASS)).forEach(function (element) {
        element.addEventListener('change', toggleCookie);
    })
}

const acceptRequired = () => {
    acceptedCookies = config.cookies.filter(x => x.technicallyRequired)
    setCookie(generateCookieValue(acceptedCookies))
    hideLayer()
    hideDetails()
    initScripts()
}
const acceptSelected = () => {
    setCookie(generateCookieValue(getSelectedCookies()))
    hideLayer()
    hideDetails()
    initScripts()
}
const acceptAll = () => {
    setCookie(generateCookieValue(config.cookies))
    hideLayer()
    hideDetails()
    initScripts()
}
const declineAll = () => {
    setCookie(generateCookieValue([]))
    hideLayer()
    hideDetails()
}
