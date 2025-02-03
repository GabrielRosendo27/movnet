const API_BASE_URL = import.meta.env.VITE_DEV_API_URL;

// import.meta.env.MODE === "development" ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_API_BASE_URL_PROD;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/User`,
    LOGIN: `${API_BASE_URL}/api/User/login`,
    LOGOUT: `${API_BASE_URL}/api/User/logout`,
  },
  MOVIES: {
    GET_BY_NAME: (movieName: string) => `${API_BASE_URL}/api/Movie/${encodeURIComponent(movieName)}`,
  },
  USER: {
    MOVIES: `${API_BASE_URL}/api/User/movies`,
  },
};
