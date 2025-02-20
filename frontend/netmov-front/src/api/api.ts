// const API_BASE_URL = import.meta.env.VITE_DEV_API_URL;
const APP_URL = import.meta.env.REACT_APP_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${APP_URL}/api/Auth/login`, // Login de usuário
    LOGOUT: `${APP_URL}/api/Auth/logout`, // Saída de usuário
  },
  MOVIES: {
    GET_BY_NAME: (movieName: string) => `${APP_URL}/api/Movie/${encodeURIComponent(movieName)}`, // GET Título para buscar filme retornando filme
  },
  USER: {
    REGISTER: `${APP_URL}/api/User`,
    GETUSERNAME: `${APP_URL}/api/User/get-username`,
    MOVIES: `${APP_URL}/api/User/movies-list`,
    MOVIEID: (movieId: number) => `${APP_URL}/api/User/movies/${movieId}`,
  },
};
