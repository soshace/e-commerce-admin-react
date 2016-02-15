import request from 'superagent';

var BASE_URL = 'http://162.243.16.54:1337/';
export default {
    BASE: BASE_URL,
    USERS: BASE_URL + 'users',
    LOGIN: BASE_URL + 'users/login',
    LOGOUT: BASE_URL + 'users/logout',
    PROFILE: BASE_URL + 'users/profile',

    COMPANIES: BASE_URL + 'companies',
    PROJECTS: BASE_URL + 'projects',
    TEAMS: BASE_URL + 'teams',

    PRODUCTS: BASE_URL + 'products',
    VARIANTS: BASE_URL + 'variants',
    PRODUCT_TYPES: BASE_URL + 'product_types',
    PRODUCT_ATTRIBUTES: BASE_URL + 'product_attributes',
    VARIANT_ATTRIBUTES: BASE_URL + 'variant_attributes',
    CATEGORIES: BASE_URL + 'categories',

    request: function (options) {
        return request(options.method, options.url)
            .type('json')
            .withCredentials()
            .send(options.data || {})
            .end(function(err, res){
                if (err) options.error && options.error(err);
                options.success && options.success(res.body, res);
            });
    }

}
