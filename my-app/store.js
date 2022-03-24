import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from './_features/globals/loadingSlice';
import userReducer from './_features/users/usersSlice';
import shopReducer from './_features/shops/shopsSlice';
export default configureStore({
    reducer: {
        loading: loadingReducer,
        users: userReducer,
        shops: shopReducer,
    },
});