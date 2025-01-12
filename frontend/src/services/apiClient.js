import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
