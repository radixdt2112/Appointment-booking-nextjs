import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadingState: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        activateLoading: (state, action) => {
            state.loadingState = true;
        },
        deactivateLoading: (state) => {
            state.loadingState = false;
        },
    },
    extraReducers: {},
});

export const getLoadingState = (state) => state.loading.loadingState;

export const { activateLoading, deactivateLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
