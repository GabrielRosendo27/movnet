// const API_BASE_URL = import.meta.env.VITE_DEV_API_URL;
const APP_URL = import.meta.env.VITE_PROD_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${APP_URL}/Auth/login`, // Login de usuário
    LOGOUT: `${APP_URL}/Auth/logout`, // Saída de usuário
  },
  MOVIES: {
    GET_BY_NAME: (movieName: string) => `${APP_URL}/Movie/${encodeURIComponent(movieName)}`, // GET Título para buscar filme retornando filme
  },
  USER: {
    REGISTER: `${APP_URL}/User`,
    GETUSERNAME: `${APP_URL}/User/get-username`,
    MOVIES: `${APP_URL}/User/movies-list`,
    MOVIEID: (movieId: number) => `${APP_URL}/User/movies/${movieId}`,
  },
};
