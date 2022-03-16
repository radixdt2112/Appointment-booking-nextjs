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
export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (params) => await userService.register(params)
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logoutUser: (state, action) => {
            state.activeUser = null;
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            const data = userService.getUser();
            if (!!data) {
                state.activeUser = data;
            } else {
                state.activeUser = null;
            }
        }
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
            state.activeUser = action.payload;
        },
        [registerUser.fulfilled]: (state, action) => { }

    },
});

export const selectActiveUser = (state) => state.users.activeUser;
export const { logoutUser, setUser } = usersSlice.actions;
export default usersSlice.reducer;
