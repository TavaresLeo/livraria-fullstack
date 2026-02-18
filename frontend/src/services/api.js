import axios from 'axios';

const api = axios.create ({
    baseURL: 'https://minha-api-livraria.onrender.com/api', // URL do Backend

});

export default api;
