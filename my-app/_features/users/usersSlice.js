import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { accountService } from '_services';


const initialState = {
    activeUser: null,
    error: null,
};

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (params) => await accountService.login(params)
);

// export const logoutUser = createAsyncThunk(
//     'accounts/logoutUser',
//     async () => await accountService.logout()
// );

// export const clearData = createAsyncThunk(
//     'accounts/clearData',
//     async () => await accountService.clearData()
// );

// export const refreshToken = createAsyncThunk(
//     'accounts/refreshToken',
//     async () => await accountService.refreshToken()
// );

// export const updateUserSettings = createAsyncThunk(
//     'accounts/userSettings',
//     async (id, params) => await accountService.updateUserSettings(id, params)
// );

// const accountsSlice = createSlice({
//     name: 'accounts',
//     initialState,
//     reducers: {
//         definePermissions: (state, action) => {
//             definePermissionsForUser(state.activeUser);
//         },
//         setUnitDisplay: (state, action) => {
//             localStorage.setItem('unitDisplay', !state.unitDisplay);
//             state.unitDisplay = !state.unitDisplay;
//         },
//         setUserSettings: (state, action) => {
//             state.activeUser.userSettings = action.payload;
//         },
//     },
//     extraReducers: {
//         [loginUser.fulfilled]: (state, action) => {
//             state.activeUser = action.payload;
//         },
//         [logoutUser.fulfilled]: (state, action) => {
//             state.activeUser = null;
//         },
//         [refreshToken.fulfilled]: (state, action) => {
//             state.activeUser = action.payload;
//         },
//     },
// });

// export const selectActiveUser = (state) => state.accounts.activeUser;
// export const selectUnitDisplay = (state) => state.accounts.unitDisplay;
// export const selectUserSettings = (state) => state.accounts.userSettings;
// export const { definePermissions, setUnitDisplay, setUserSettings } =
//     accountsSlice.actions;
// export default accountsSlice.reducer;
