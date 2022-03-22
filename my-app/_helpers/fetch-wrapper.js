import { config } from '../config.js';
import { userService } from '../_services';

export const fetchWrapper = {
    get,
    post,
    postMultiFormData,
    put,
    putMultiFormData,
    delete: _delete,
};

function get(url) {
    console.log(url);
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url),
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    console.log(JSON.stringify(body));
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body),
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function postMultiFormData(url, formData) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(url) },
        credentials: 'include',
        body: formData,
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body),
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function putMultiFormData(url, formData) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(url) },
        credentials: 'include',
        body: formData,
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url),
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions
function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = url.startsWith(config.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            if (
                [401, 403].includes(response.status)
            ) {
                userService.logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return { headers: response.headers, data: data };
    });
}
