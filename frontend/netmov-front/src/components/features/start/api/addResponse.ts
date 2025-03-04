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
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  if (response) {
    console.log("Resposta método addResponse: ", response);
  }
  return result;
};
