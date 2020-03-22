import {ACCESS_TOKEN, API_BASE_URL} from '../constants';

const request = (options) => {

    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => {
            if (!response.ok) {
                throw response
            }
            if (response.status !== 204) {
                return response.json()
            }
        }).then(json => {
            return json;
        });
};


export function getAllBrands() {
    const url = API_BASE_URL + '/brands'

    return request({
        url: url,
        method: 'GET'
    });
}


export function getAllProducts(searchCriteria) {
    // const url = API_BASE_URL +
    //     "/gift-certificates?" +
    //     "page=" + searchCriteria.page +
    //     "&size=" + searchCriteria.size +
    //     "&sortBy=" + searchCriteria.sortBy +
    //     "&giftName=" + searchCriteria.giftName +
    //     "&tagName=" + searchCriteria.tagName;

    const page = searchCriteria.page !== 0 ? searchCriteria.page - 1 : searchCriteria.page;

    const url = API_BASE_URL + '/products?' +
        "page=" + page
        + "&size=" + searchCriteria.size;

    console.log('URL', url);

    return request({
        url: url,
        method: 'GET'
    });

}

export function getProductById(productId) {
    const url = API_BASE_URL + "/products/" + productId;

    return request({
        url: url,
        method: 'GET'
    });
}

export function createProduct(product) {
    return request({
        url: API_BASE_URL + "/products",
        method: 'POST',
        body: JSON.stringify(product)
    });
}


export function updateProduct(product) {
    return request({
        url: API_BASE_URL + "/products/" + Number(product.id),
        method: 'PUT',
        body: JSON.stringify(product)
    });
}

export function deleteProduct(productId) {
    const uri = API_BASE_URL + "/products/" + Number(productId)
    return request({
        url: uri,
        method: 'DELETE'
    });
}

export function getAllBasketProducts(userId) {
    const url = API_BASE_URL + '/users/' + userId + '/baskets';

    console.log('url', url);
    return request({
        url: url,
        method: 'GET'
    });
}

export function addProductToBasket(productBasket) {

    const url = API_BASE_URL + '/users/' + productBasket.userId + '/baskets';

    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(productBasket)
    });
}

export function deleteProductFromBasket(productBasket) {
    const url = API_BASE_URL + '/users/' + productBasket.userId + '/baskets';

    return request({
        url: url,
        method: 'DELETE',
        body: JSON.stringify(productBasket)
    });
}

export function updateProductInBasket(productBasket) {

    const url = API_BASE_URL + '/users/' + productBasket.userId + '/baskets';

    return request({
        url: url,
        method: 'PUT',
        body: JSON.stringify(productBasket)
    });
}

export function createOrder(order) {
    const url = API_BASE_URL + '/orders/';

    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(order)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signUp(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/sign-up",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/users/me",
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/auth/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


