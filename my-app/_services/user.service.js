import { config } from '../config';
import { fetchWrapper } from '../_helpers';

const baseUrl = `${config.apiUrl}`;

const login = (params) => {
    return fetchWrapper
        .post(`${baseUrl}/login`, params)
        .then((response) => {
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
};

const register = (params) => {
    return fetchWrapper
        .post(`${baseUrl}/register`, params)
        .then((response) => {
            const user = response.data;
            console.log(user);
            return user;
        });
}

const sendOtp = (params) => {
    return fetchWrapper
        .post(`${baseUrl}/sendMail`, params)
        .then((response) => {
            const data = response.data;
            return data;
        })
}

const verifyOtp = (params) => {
    return fetchWrapper
        .post(`${baseUrl}/verifyOtp`, params)
        .then((response) => {
            console.log('>>>>>>>>>>>>>>>>>  ', response.data);
            const data = response.data;
            return data;
        })
}

const logout = () => {
    localStorage.removeItem('user');
};

const getUserById = (params) => {
    // console.log(params);
    return fetchWrapper.get(`${baseUrl}/users/${params}`)
        .then((response) => {
            return response.data;
        });
}

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const userService = {
    login, logout, getUser, register, sendOtp, verifyOtp, getUserById
};