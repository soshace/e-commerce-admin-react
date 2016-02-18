export default {
    // Users
    REGISTER_USER: 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    GET_USER: 'GET_USER',
    UPDATE_USER: 'UPDATE_USER',

    LOGIN_SUCCESS_CODE: 'successful',
    LOGIN_FAIL_CODE: 'error',
    NOT_AUTHENTICATED_CODE: 'not.authenticated',

    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',

    // Companies
    GET_COMPANIES: 'GET_COMPANIES',
    GET_COMPANY: 'GET_COMPANY',
    CREATE_COMPANY: 'CREATE_COMPANY',
    UPDATE_COMPANY: 'UPDATE_COMPANY',

    // Projects
    GET_PROJECTS: 'GET_PROJECTS',
    GET_COMPANY_PROJECTS: 'GET_COMPANY_PROJECTS',
    ADD_PROJECT: 'ADD_PROJECT',
    UPDATE_PROJECT: 'UPDATE_PROJECT',
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

    // Products
    GET_PRODUCT: 'GET_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    UPDATE_PRODUCT_CATEGORY: 'UPDATE_PRODUCT_CATEGORY',
    GET_PRODUCTS: 'GET_PRODUCTS',
    GET_PROJECT_PRODUCTS: 'GET_PROJECT_PRODUCTS',
    CREATE_PRODUCT: 'CREATE_PRODUCT',

    // Projects
    GET_PROJECT_CATEGORIES: 'GET_PROJECT_CATEGORIES',
    GET_PRODUCT_CATEGORIES: 'GET_PRODUCT_CATEGORIES',
    GET_PROJECT_PRODUCT_TYPES: 'GET_PROJECT_PRODUCT_TYPES',

    // Product types
    GET_PRODUCT_TYPE: 'GET_PRODUCT_TYPE',
    GET_PRODUCT_TYPE_ATTRS: 'GET_PRODUCT_TYPE_ATTRS',
    CREATE_PRODUCT_TYPE: 'CREATE_PRODUCT_TYPE',
    UPDATE_PRODUCT_TYPE: 'UPDATE_PRODUCT_TYPE',

    // Variants
    GET_PRODUCT_VARIANTS: 'GET_PRODUCT_VARIANTS',
    CREATE_VARIANT: 'CREATE_VARIANT',
    UPDATE_VARIANT: 'UPDATE_VARIANT',
    REMOVE_VARIANT: 'REMOVE_VARIANT',

    // Attributes
    ADD_ATTRIBUTE: 'ADD_ATTRIBUTE',
    REMOVE_ATTRIBUTE: 'REMOVE_ATTRIBUTE',
    UPDATE_VARIANT_ATTRIBUTE: 'UPDATE_VARIANT_ATTRIBUTE',

    // Categories
    GET_CATEGORY: 'GET_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    GET_CATEGORIES: 'GET_CATEGORIES',
    CREATE_CATEGORY: 'CREATE_CATEGORY',

    // Teams
    GET_TEAMS: 'GET_TEAMS',
    CREATE_TEAM: 'CREATE_TEAM',
    UPDATE_TEAM: 'UPDATE_TEAM',
    REMOVE_TEAM: 'REMOVE_TEAM',
    UPDATE_PERMISSION: 'UPDATE_PERMISSION',
    SEND_INVITE: 'SEND_INVITE',
    REMOVE_MEMBER: 'REMOVE_MEMBER',

    // Images
    GET_PRODUCT_IMAGES: 'GET_PRODUCT_IMAGES',
    ADD_IMAGE: 'ADD_IMAGE',
    UPLOAD_IMAGE: 'UPLOAD_IMAGE',
    GET_IMAGE: 'GET_IMAGE',
    UPDATE_IMAGE: 'UPDATE_IMAGE',
    REMOVE_IMAGE: 'REMOVE_IMAGE',

    // Prices
    ADD_PRICE: 'ADD_PRICE',
    REMOVE_PRICE: 'REMOVE_PRICE',
    UPDATE_PRICE: 'UPDATE_PRICE',

    // Locales
    GET_COUNTRIES: 'GET_COUNTRIES',
    GET_LANGUAGES: 'GET_LANGUAGES',
    GET_CURRENCIES: 'GET_CURRENCIES',

    PRODUCT_ATTR_TYPES: [
        'text', 'boolean', 'localizedText', 'enum', 'localizedEnum',
        'number', 'money', 'date', 'time', 'dateTime', 'set', 'reference'],

    PERMISSIONS: ['none', 'view', 'manage']
}