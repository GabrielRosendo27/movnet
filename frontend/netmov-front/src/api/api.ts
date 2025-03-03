// const APP_URL = import.meta.env.VITE_PROD_API_URL;
// const DEV_URL = import.meta.env.VITE_DEV_API_URL;

const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/Auth/login`, // Login de usuário
    LOGOUT: `${BASE_URL}/Auth/logout`, // Saída de usuário
  },
  MOVIES: {
    GET_BY_NAME: (movieName: string) => `${BASE_URL}/Movie/${encodeURIComponent(movieName)}`, // GET Título para buscar filme retornando filme
  },
  USER: {
    REGISTER: `${BASE_URL}/User`,
    GETUSERNAME: `${BASE_URL}/User/get-username`,
    MOVIES: `${BASE_URL}/User/movies-list`,
    MOVIEID: (movieId: number) => `${BASE_URL}/User/movies/${movieId}`,
  },
};
