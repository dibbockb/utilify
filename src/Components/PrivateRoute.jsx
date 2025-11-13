import React, { useContext } from 'react';
import { AuthContext } from './Context';
import { Navigate, useLocation } from 'react-router';

export default function PrivateRoute({ children }) {

    const { user } = useContext(AuthContext)
    const location = useLocation();

    return user ? children : <Navigate to={'/login'} state={{ from: location }} replace />
}