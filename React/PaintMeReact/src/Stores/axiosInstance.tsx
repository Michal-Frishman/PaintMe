import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function isTokenValid(): boolean {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const tokenCheck = JSON.parse(token)._token;
    const session_data = tokenCheck.split('.');
    const payload = JSON.parse(atob(session_data[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const loginUser = localStorage.getItem('loginUser');
    if (loginUser) {
      const token = JSON.parse(loginUser)._token;

      if (!isTokenValid()) {
        console.warn("Token expired - redirecting to login.");
        localStorage.removeItem('loginUser');
        window.location.href = "/login?expired=true";
        return Promise.reject(new Error("Token expired"));
      }

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

    if (error.response?.status === 401 && !message.includes('Token has expired')) {
      console.warn("Unauthorized: ", message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
