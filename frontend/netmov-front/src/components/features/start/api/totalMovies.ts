import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../../api/api";

export const TotalUserMovies = () => {
  return useQuery<number>({
    queryKey: ["totalUserMovies"],
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(API_ENDPOINTS.USER.TOTAL_MOVIES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha ao obter filmes totais");
      }
      const data = await response.json();
      console.log("total de filmes: ", data);
      return Number(data);
    },
    retry: 1,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};
