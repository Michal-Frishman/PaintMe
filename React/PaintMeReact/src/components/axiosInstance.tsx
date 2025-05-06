import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    console.log("interceptor triggered, token:", token);

    console.log("inter");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    console.log("headers:", config.headers);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;