import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../_services';

const initialState = {
    activeUser: null,
    error: null,
};

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (params) => await userService.login(params)
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logoutUser: (state, action) => {
            state.activeUser = null;
            localStorage.removeItem('user');
        }
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
            state.activeUser = action.payload;
        },

    },
});

export const selectActiveUser = (state) => state.users.activeUser;
export const { logoutUser } = usersSlice.actions;
export default usersSlice.reducer;
