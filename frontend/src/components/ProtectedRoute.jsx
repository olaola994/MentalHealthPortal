import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        return <Navigate to="/zarejestruj" />;
    }

    try {
        const decodedToken = jwtDecode(token); 
        const userRole = decodedToken.role;

        if (allowedRoles && !allowedRoles.includes(userRole)) {
            return <Navigate to="/" />;
        }
        return children;
    } catch (err) {
        console.error('Token decode error:', err);
        return <Navigate to="/zarejestruj" />;
    }
};

export default ProtectedRoute;
