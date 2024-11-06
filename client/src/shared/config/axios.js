import axios from 'axios';

// Configuration de base pour axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token d'authentification dans chaque requête
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Récupère le token du localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Ajoute le token aux headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
