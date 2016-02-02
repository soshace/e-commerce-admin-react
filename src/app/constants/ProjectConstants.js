import {BASE_URL} from './AuthConstants.js';
export default {
    BASE_URL: BASE_URL,
    PROFILE_URL: BASE_URL + 'profile',

    GET_PROFILE: 'GET_PROFILE',
    GET_PROJECTS: 'GET_PROJECTS',
    PROJECT_CURRENCIES: {
        'usd': 'USD',
        'eur': 'EUR',
        'gbr': 'GBR',
        'inr': 'INR'
    },
    PROJECT_LANGUAGES: {
        'en': 'English',
        'fr': 'French',
        'de': 'German',
        'ja': 'Japanese',
        'zh': 'Chinese'
    },
    PROJECTS_URL: 'user/:user_id/projects'
}