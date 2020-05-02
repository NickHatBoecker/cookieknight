import config from "./config";
import { loadCookieConfig } from "./helper";
import { getClosest } from "./util/utils";

const DETAIL_LAYER_ID = 'cookieknight-details'

export const showLayer = () => document.getElementById(config.elementId).style.display = 'block'
export const hideLayer = () => document.getElementById(config.elementId).style.display = 'none'
export const showDetails = () => document.getElementById(DETAIL_LAYER_ID).style.display = 'block'
export const hideDetails = () => document.getElementById(DETAIL_LAYER_ID).style.display = 'none'

export const openDialog = () => {
    loadCookieConfig()
    hideLayer()
    showDetails()
}

export const closeDialog = () => {
    hideDetails()
}

export const closeDialogShowLayer = () => {
    hideDetails()
    showLayer()
}

export const resetLayer = () => {
    const checkboxes = document.querySelectorAll(`.${config.TOGGLE_COOKIE_CLASS}[data-id]`)
    checkboxes.forEach(checkbox => {
        checkbox.checked = false

        const parent = getClosest(checkbox, '.cookieknight-detail__cookie')
        parent.classList.remove('cookieknight-detail__cookie__checked')
    })
}
