import { config } from '../config';
import { fetchWrapper } from '../_helpers';

const baseUrl = `${config.apiUrl}`;

const login = (params) => {
    return fetchWrapper
        .post(`${baseUrl}/login`, params)
        .then((response) => {
            const user = response.data;
            console.log(user);
            // publish user to subscribers and start timer to refresh token
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const userService = {
    login, logout, getUser
};