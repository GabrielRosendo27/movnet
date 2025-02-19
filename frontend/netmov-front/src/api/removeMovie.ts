import { RemoveMovieResponse } from "../types/movieTypes";
import { API_ENDPOINTS } from "./api";

export const removeMovie = async (movieId: number): Promise<RemoveMovieResponse> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Token não encontrado. Faça login novamente.");

  const response = await fetch(`${API_ENDPOINTS.USER.MOVIEID(movieId)}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || "Erro ao remover filme");
    } catch {
      throw new Error(errorText || "Erro desconhecido");
    }
  }

  console.log("Resposta método removeMovieResponse: ", response);
  return response.json();
};
