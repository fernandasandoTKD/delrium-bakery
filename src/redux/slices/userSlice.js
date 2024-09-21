import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUser: (state, action) => {
            const {name, username, email} = action.payload;
            state.name = name;
            state.username = username;
            state.email = email;
            state.role = role;
        }
    },
});

export const { addUser, changeEmail } = userSlice.actions;
export default userSlice.reducer;