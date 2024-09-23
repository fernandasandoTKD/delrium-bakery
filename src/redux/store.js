import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import permissionsReducer from './slices/permissionsSlice'; // Importa el reducer de permisos

const store = configureStore({
    reducer: {
        user: userReducer, // Asegúrate de que el reducer de usuario esté aquí
        permissions: permissionsReducer, // Asegúrate de que el reducer de permisos esté aquí
    },
});

// Exporta el store
export default store; // Asegúrate de que esta línea esté presente