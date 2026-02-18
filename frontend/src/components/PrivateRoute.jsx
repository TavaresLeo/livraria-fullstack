import React from 'react';
import { Navigate } from 'react-router-dom';

// Esse componente age como um "Porteiro"
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Verifica se tem o crachá

    // Se tiver token, deixa entrar (mostra a página filha)
    // Se não tiver, chuta de volta para o /login
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;