const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/Auth/login`,
    LOGOUT: `${BASE_URL}/Auth/logout`,
  },
  MOVIES: {
    GET_BY_NAME: (movieName: string) => `${BASE_URL}/Movie/${encodeURIComponent(movieName)}`,
    POPULAR_MOVIES: `${BASE_URL}/Movie/popular`,
    TOP_RATED: `${BASE_URL}/Movie/top-rated`,
  },
  USER: {
    REGISTER: `${BASE_URL}/User`,
    GETUSERNAME: `${BASE_URL}/User/get-username`,
    MOVIES: `${BASE_URL}/User/movies-list`,
    MOVIEID: (movieId: number) => `${BASE_URL}/User/movies/${movieId}`,
    TOTAL_MOVIES: `${BASE_URL}/User/total-movies`,
    TOTAL_HOURS: `${BASE_URL}/User/total-hours-watch`,
  },
};
