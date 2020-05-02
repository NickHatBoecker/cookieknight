let defaultConfig = {
    elementId: 'cookieknight',
    privacyPolicy: '/privacy.html',
    introText: 'Diese Website verwendet Cookies, um Ihnen den bestmöglichen Service zu ermöglichen. Einige Cookies sind technisch notwendig, während andere uns helfen, diese Website und unsere Angebote für Sie zu verbessern. Sie können Ihre Zustimmung jederzeit im Bereich „Cookies“ der Datenschutzerklärung widerrufen.',
    acceptRequiredText: 'Erforderliche akzeptieren',
    moreText: 'Weitere Optionen',
    acceptAllText: 'Alle akzeptieren',
    acceptSelectedText: 'Ausgewählte akzeptieren',
    declineAllText: 'Alle ablehnen',
    technicallyRequiredText: 'Technisch erforderlich',
    goBackText: 'Zurück',
    individualCookieHeadline: 'Individuelle Cookie Einstellungen',
    individualCookieText: 'Wählen Sie aus, welche Cookies Sie aktivieren bzw. deaktivieren möchten. Weitere Informationen finden Sie in der <a href="#">Datenschutzerklärung</a> im Bereich „Cookies“. Dort können Sie jederzeit Ihre Zustimmung widerrufen.',
    purposeText: 'Verwendung',
    acceptCookieText: 'Cookie akzeptieren',
    cookieName: 'cookieknight',
    cookies: [],
    cookieExpiresAfterDays: 365,
    cookieDomain: '',
}

// These are not editable
const config = {
    ACCEPT_REQUIRED_ID: 'js-cookieknight-accept-required',
    ACCEPT_SELECTED_ID: 'js-cookieknight-accept-selected',
    ACCEPT_ALL_ID: 'js-cookieknight-accept-all',
    SHOW_MORE_ID: 'cookieknight-show-more',
    DECLINE_ID: 'js-cookieknight-decline',
    CLOSE_DIALOG_ID: 'cookieknight-back',
    TOGGLE_COOKIE_CLASS: 'js-cookieknight-toggle-cookie',
}

if (typeof window.cookieKnightConfig !== 'undefined') {
    // Merge config objects
    for (let prop in defaultConfig) {
        config[prop] = defaultConfig[prop]
    }

    for (let prop in window.cookieKnightConfig) {
        if (config.hasOwnProperty(prop)) {
            config[prop] = window.cookieKnightConfig[prop]
        }
    }
}

export default config
