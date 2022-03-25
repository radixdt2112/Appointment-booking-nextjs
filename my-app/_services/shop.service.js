import { config } from '../config';
import { fetchWrapper } from '../_helpers';

const baseUrl = `${config.apiUrl}`;

export const getShops = (shopName) => {
    return fetchWrapper.get(`${baseUrl}/shops?shopName=${shopName ? `${shopName}` : ''}`)
        .then((response) => {
            return response.data;
        });
}


// export const updateShop = (params) =>{
//     return fetchWrapper.put
// }

export const shopService = {
    getShops
};