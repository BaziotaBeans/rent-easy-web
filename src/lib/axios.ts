import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json', // Definindo tipo de conteúdo padrão
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  // // Adicionando cabeçalhos CORS para testes
  // config.headers['Access-Control-Allow-Origin'] = '*';
  // config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
  // config.headers['Access-Control-Allow-Headers'] = '*';
  // config.headers['Content-Type'] = 'application/json';
  
  
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       Cookies.remove('accessToken');
//       window.location.href = '/auth/sign-in';
//     }
//     return Promise.reject(error);
//   }
// );