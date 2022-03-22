import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../_services';

const initialState = {
    activeUser: null,
    isActive: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (params) => await userService.login(params)
);
export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (params) => await userService.register(params)
);

export const getUserById = createAsyncThunk(
    'user/activeUser',
    async (params) => await userService.getUserById(params)
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logoutUser: (state, action) => {
            userService.logout();
            state.activeUser = null;

        },
        setUser: (state, action) => {
            state.activeUser = action.payload;
        }
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
            state.activeUser = action.payload;
        },
        [registerUser.fulfilled]: (state, action) => { },

        [getUserById.fulfilled]: (state, action) => {
            state.activeUser = action.payload;
        },
        [getUserById.rejected]: (state, action) => {
            // localStorage.removeItem('user');
            state.isActive = false;
            state.activeUser = null;
        }

    },
});

export const selectActiveUser = (state) => state.users.activeUser;
export const isLogin = (state) => state.users.isActive;
export const { logoutUser, setUser } = usersSlice.actions;
export default usersSlice.reducer;
