import axios from 'axios';

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL  

const instance = axios.create({
    baseURL: backendApiUrl,
    withCredentials: true,
    });
export default instance;