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
    REGISTER: `${API_BASE_URL}/api/User`, // POST registro de usuário
    GETUSERNAME: `${API_BASE_URL}/api/User/get-username`, // GET retornar nome de usuário
    MOVIES: `${API_BASE_URL}/api/User/movies`, // GET retorna lista de filmes
    MOVIEID: (movieId: number) => `${API_BASE_URL}/api/User/movies${movieId}`, // POST Adicionar relação usuário/filme
  },
};
