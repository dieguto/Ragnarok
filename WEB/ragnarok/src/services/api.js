import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3107'
});

export default api;
