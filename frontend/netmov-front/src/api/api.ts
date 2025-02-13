const API_BASE_URL = import.meta.env.VITE_DEV_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/Auth/login`, // Login de usuário
    LOGOUT: `${API_BASE_URL}/api/Auth/logout`, // Saída de usuário
  },
  MOVIES: {
    GET_BY_NAME: (movieName: string) => `${API_BASE_URL}/api/Movie/${encodeURIComponent(movieName)}`, // GET Título para buscar filme retornando filme
  },
  USER: {
    REGISTER: `${API_BASE_URL}/api/User`,
    GETUSERNAME: `${API_BASE_URL}/api/User/get-username`,
    MOVIES: `${API_BASE_URL}/api/User/movies`,
    MOVIEID: (movieId: number) => `${API_BASE_URL}/api/User/movies${movieId}`,
  },
};
