import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shopService } from '../../_services';

const initialState = {

    activeTab: 0,
    totalServices: 0,
    totalUser: 0,
    totalSlots: 0,
    error: null,
};

export const getShops = createAsyncThunk(
    'shops/getShops',
    async (params) => await shopService.getShops(params)
);

const shopAdminSlice = createSlice({
    name: 'shopAdmin',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        }
    },
    extraReducers: {
        [getShops.fulfilled]: (state, action) => {
            state.activeShops = action.payload;
        },
        [getShops.rejected]: (state, action) => {
            state.activeShops = null;
        }
    },
});

export const selectActiveTab = (state) => state.shopAdmin.activeTab;
export const selectTotalServices = (state) => state.shopAdmin.totalServices;
export const selectTotalUser = (state) => state.shopAdmin.totalUser;
export const selectTotalSlots = (state) => state.shopAdmin.totalSlots;


export const { setActiveTab } = shopAdminSlice.actions;
export default shopAdminSlice.reducer;
