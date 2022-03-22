import { config } from '../config';
import { fetchWrapper } from '../_helpers';

const baseUrl = `${config.apiUrl}`;

export const getShops = () => {
    return fetchWrapper.get(`${baseUrl}/shops`)
        .then((response) => {
            return response.data;
        });
}

export const shopService = {
    getShops
};