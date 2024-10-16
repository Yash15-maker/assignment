import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from "prop-types"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = (newToken) => setToken(newToken);
    const logout = () => setToken(null);
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, login, isAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};