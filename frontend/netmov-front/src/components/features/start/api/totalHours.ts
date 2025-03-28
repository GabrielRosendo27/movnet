import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../../api/api";

export const TotalHours = () => {
  return useQuery<number>({
    queryKey: ["totalHours"],
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(API_ENDPOINTS.USER.TOTAL_HOURS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Falha ao obter horas totais");
      }
      const data = await response.json();
      console.log("total de horas: ", data);
      return Number(data);
    },
    retry: 1,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};
