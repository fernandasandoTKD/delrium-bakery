import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from "prop-types";

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
        setIsAuthenticated(true);
        console.log(isAuthenticated);
        
        setAuth(userData);
        localStorage.setItem("token", userData.token); // Guarda el token
        localStorage.setItem("user", JSON.stringify(userData)); // Guarda el usuario
    };

    const logout = () => {
        setIsAuthenticated(false);
        setAuth({});
        localStorage.removeItem("token"); // Limpia el token
        localStorage.removeItem("user"); // Limpia el usuario
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
