import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from './_features/globals/loadingSlice';
import userReducer from './_features/users/usersSlice'
export default configureStore({
    reducer: {
        loading: loadingReducer,
        users: userReducer
    },
});