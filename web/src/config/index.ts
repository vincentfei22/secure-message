// Your app name
const APP_NAME = "Related:Chat";

// Default theme of the web app
const DEFAULT_THEME = "theme01";

// Number of files in the `public/stickers` folder
const STICKERS_COUNT = 78;

// Number of files in the `public/themes` folder
const THEMES_COUNT = 60;

// Maximum number of characters a message can contain
const MESSAGE_MAX_CHARACTERS = 12000;

// Number of messages per "page" (pagination)
const MESSAGES_PER_PAGE = 30;

// Use email fast sign in (DEVELOPMENT ONLY)
const FAKE_EMAIL = true;

// Get the API URL
function getAPIUrl() {
    if (typeof window === "undefined") {
        return "";
    }

    return process.env.REACT_APP_API_URL ||
        `${window.location.protocol}//${window.location.hostname}:4001`;
}

// Get the GraphQL server URL
function getGQLServerUrl() {
    if (typeof window === "undefined") {
        return "";
    }

    return process.env.REACT_APP_GQL_SERVER_URL ||
        `${window.location.protocol}//${window.location.hostname}:4000`;
}

export {
    APP_NAME,
    DEFAULT_THEME,
    STICKERS_COUNT,
    THEMES_COUNT,
    MESSAGE_MAX_CHARACTERS,
    MESSAGES_PER_PAGE,
    FAKE_EMAIL,
    getAPIUrl,
    getGQLServerUrl
};
