import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../../config/api";

interface Movie {
  id: number;
  Title: string;
  PosterPath: string;
  Year: number;
  IMDBRating: number;
  Overview: string;
}

export const useUserMovies = () => {
  return useQuery<Movie[]>({
    queryKey: ["userMovies"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.USER.MOVIES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Erro na requisição:", errorMessage);
        throw new Error(errorMessage || "Falha ao carregar lista de filmes");
      }

      return response.json();
    },
  });
};
