import axios from 'axios';

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000/api';

const instance = axios.create({
    baseURL: backendApiUrl,
    withCredentials: true,
    });
export default instance;