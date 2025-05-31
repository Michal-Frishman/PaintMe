import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(

  response => response,
  error => {
    const data = error.response?.data;
    const message =
      typeof data === 'string' ? data :
        typeof data?.message === 'string' ? data.message :
          error.message;

    if (error.response?.status === 401 && message.includes('Token has expired')) {
      sessionStorage.removeItem('token');
window.location.href = "/#/login?expired=true";
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
