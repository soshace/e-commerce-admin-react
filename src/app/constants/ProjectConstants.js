import {BASE_URL} from './AuthConstants.js';
export default {
    BASE_URL: BASE_URL,
    PROFILE_URL: BASE_URL + 'users/profile',

    GET_PROFILE: 'GET_PROFILE',
    GET_PROJECTS: 'GET_PROJECTS',
    ADD_PROJECT: 'ADD_PROJECT',
    PROJECT_CURRENCIES: [
        { key: 'USD', text: 'USD'},
        { key: 'EUR', text: 'EUR'},
        { key: 'GBR', text: 'GBR'},
        { key: 'INR', text: 'INR'}
    ],

    PROJECT_LANGUAGES: [
        { key: 'en', text: 'English'},
        { key: 'fr', text: 'French'},
        { key: 'de', text: 'German'},
        { key: 'ja', text: 'Japanese'},
        { key: 'zh', text: 'Chinese'}
    ],

    PROJECTS_URL: BASE_URL + 'users/:user_id/projects'
}