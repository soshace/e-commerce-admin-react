import request from 'superagent';

var BASE_URL = 'http://162.243.16.54:1337/';
export default {
    BASE: BASE_URL,

    UPLOAD_BASE: 'http://162.243.16.54:5000/uploaded',

    //Auth
    USERS: BASE_URL + 'users',
    LOGIN: BASE_URL + 'users/login',
    LOGOUT: BASE_URL + 'users/logout',
    PROFILE: BASE_URL + 'users/profile',

    //Settings
    COMPANIES: BASE_URL + 'companies',
    PROJECTS: BASE_URL + 'projects',
    TEAMS: BASE_URL + 'teams',
    PERMISSIONS: BASE_URL + 'permissions',
    INVITATIONS: BASE_URL + 'invitations',

    //Product
    PRODUCTS: BASE_URL + 'products',
    VARIANTS: BASE_URL + 'variants',
    PRODUCT_TYPES: BASE_URL + 'product_types',
    PRODUCT_ATTRIBUTES: BASE_URL + 'product_attributes',
    VARIANT_ATTRIBUTES: BASE_URL + 'variant_attributes',
    CATEGORIES: BASE_URL + 'categories',
    IMAGES: BASE_URL + 'images',
    PRICES: BASE_URL + 'prices',

    // Location
    LANGUAGES: BASE_URL + 'languages/en',
    COUNTRIES: BASE_URL + 'countries/en',
    CURRENCIES: BASE_URL + 'currencies/en',

    request: function (options) {
        var req = request(options.method, options.url);
        if (!(options.data instanceof FormData)) {
            req = req.type('json')
        }
        return req
            .withCredentials()
            .send(options.data || {})
            .end(function (err, res) {
                var errCb = options.error;
                if (err) {
                    if (errCb) {
                        errCb(res);
                    } else {
                        console.error(err);
                    }
                } else {
                    options.success && options.success(res.body, res);
                }
                if (!(options.success || options.error)) {
                    options.end && options.end(res.body, res);
                }
            });
    }

}
