import React, { createContext, useContext, useState } from 'react';
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Add a logout function
    const navigator = useNavigate();


    const logout = () => {
        // Clear the user's authentication status
        setIsAuthenticated(false);

        // Optionally, clear any stored user data, tokens, or other relevant information
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        navigator('/login'); // Redirect to the login page
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
