import { API_ENDPOINTS } from "../../../../api/api";
import { AddMovieResponse } from "../../../../types/movieTypes";

export const addResponse = async (movieId: string, token: string): Promise<AddMovieResponse> => {
  const response = await fetch(`${API_ENDPOINTS.USER.MOVIES}/${movieId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || "Erro ao adicionar filme");
    } catch {
      throw new Error(errorText || "Erro desconhecido");
    }
  }

  return response.json();
};
