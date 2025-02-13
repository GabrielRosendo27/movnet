import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api/api";

export function useProtectedRequest<T>(options?: RequestInit) {
  const token = localStorage.getItem("authToken");

  return useQuery<T, Error>({
    queryKey: ["protected-data"],
    queryFn: async () => {
      if (!token) throw new Error("Token não encontrado");
      const response = await fetch(`${API_ENDPOINTS.USER.GETUSERNAME}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        ...options,
      });

      if (!response.ok) throw new Error("Erro ao acessar rota protegida");
      return response.json();
    },
  });
}
