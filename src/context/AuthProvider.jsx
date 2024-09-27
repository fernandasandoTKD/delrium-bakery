import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        // Verificar si hay un token en localStorage al cargar la aplicación
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
            setIsAuthenticated(true);
            setAuth(JSON.parse(user)); // Establece el usuario autenticado
        }
    }, []);

    const login = (userData) => {
        // Actualizar el estado inmediatamente después del login
        setAuth(userData); // Establecer datos de usuario
        setIsAuthenticated(true); // Establecer estado de autenticación en true

        // Guardar token y usuario en localStorage
        localStorage.setItem("token", userData.token); 
        localStorage.setItem("user", JSON.stringify(userData)); 

        console.log("Logged in:", userData);
    };

    const logout = () => {
        // Restablecer estado de autenticación y usuario
        setIsAuthenticated(false);
        setAuth({});

        // Limpiar el token y el usuario de localStorage
        localStorage.removeItem("token"); 
        localStorage.removeItem("user"); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, auth, setAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;