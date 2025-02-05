import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:5000";

export function useProtectedRequest<T>(endpoint: string, options?: RequestInit) {
  const token = localStorage.getItem("authToken");

  return useMutation<T, Error, void>({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: options?.method || "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error("Erro ao acessar rota protegida");
      }

      return response.json();
    },
  });
}
