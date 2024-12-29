import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Interceptor odpowiedzi do obsługi błędów
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            // alert('Sesja wygasła. Zaloguj się ponownie.');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
