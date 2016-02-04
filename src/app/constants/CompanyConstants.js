import {BASE_URL} from './UserConstants.js';

export default {
    BASE_URL: BASE_URL,
    COMPANIES_URL: BASE_URL + 'users/:user_id/companies',
    COMPANY_URL: BASE_URL + 'companies/:company_id',
    GET_COMPANIES: 'GET_COMPANIES',
    CREATE_COMPANY: 'CREATE_COMPANY',
    UPDATE_COMPANY: 'UPDATE_COMPANY'
}