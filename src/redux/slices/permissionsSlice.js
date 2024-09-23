import { createSlice } from '@reduxjs/toolkit';

const permissionsSlice = createSlice({
    name: 'permissions',
    initialState: {
        userPermissions: [], // Asegúrate de que esta propiedad esté definida
    },
    reducers: {
        setPermissions(state, action) {
            state.userPermissions = action.payload; // Establece los permisos del usuario
        },
        clearPermissions(state) {
            state.userPermissions = []; // Limpia los permisos
        },
    },
});

// Exporta las acciones
export const { setPermissions, clearPermissions } = permissionsSlice.actions;

// Exporta el reducer
export default permissionsSlice.reducer;
