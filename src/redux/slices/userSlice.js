import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    username: '',
    email: '',
    role: '', // Asegúrate de inicializar el rol
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { name, username, email, role } = action.payload; // Asegúrate de incluir 'role' en el payload
            state.name = name;
            state.username = username;
            state.email = email;
            state.role = role; // Asigna el rol al estado
        },
        clearUser: (state) => {
            state.name = '';
            state.username = '';
            state.email = '';
            state.role = ''; // Limpia el estado del usuario
        },
        changeEmail: (state, action) => {
            state.email = action.payload; // Cambia el correo electrónico
        },
    },
});

// Exporta las acciones
export const { addUser, clearUser, changeEmail } = userSlice.actions;

// Exporta el reducer
export default userSlice.reducer;