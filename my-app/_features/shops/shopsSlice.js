import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shopService } from '../../_services';

const initialState = {
    activeShops: null,
    error: null,
};

export const getShops = createAsyncThunk(
    'shops/getShops',
    async (params) => await shopService.getShops(params)
);

const shopsSlice = createSlice({
    name: 'shops',
    initialState,
    reducers: {},
    extraReducers: {
        [getShops.fulfilled]: (state, action) => {
            state.activeShops = action.payload;
        },
        [getShops.rejected]: (state, action) => {
            state.activeShops = null;
        }
    },
});

export const selectActiveShops = (state) => state.shops.activeShops;


export default shopsSlice.reducer;
