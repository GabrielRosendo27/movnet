import { API_ENDPOINTS } from "../../../../api/api";
import { AddMovieResponse } from "../../../../types/movieTypes";

export const addResponse = async (movieId: number, token: string): Promise<AddMovieResponse> => {
  const response = await fetch(`${API_ENDPOINTS.USER.MOVIEID(movieId)}`, {
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
  if (response) {
    console.log("Resposta método addResponse: ", response);
  }
  return response.json();
};
