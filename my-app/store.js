import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from './_features/globals/loadingSlice';
export default configureStore({
    reducer: {
        loading: loadingReducer,
    },
});