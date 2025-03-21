import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../../api/api";
import { PopularMovie } from "../types/types";

export const useTopRatedMovies = () => {
  return useQuery<PopularMovie[], Error>({
    queryKey: ["topRatedMovies"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.MOVIES.TOP_RATED, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar filmes populares");
      }
      const data = await response.json();
      console.log("Dados brutos da API:", data);

      if (!Array.isArray(data)) {
        throw new Error("Resposta da API inválida");
      }

      return data.map((movie: PopularMovie) => ({
        id: movie.id,
        title: movie.title,
        rating: movie.rating,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate,
      }));
    },
    staleTime: 600000,
  });
};
