import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../../config/api";

export interface AddMovieType {
  title: string;
}
export interface AddMovieResponse {
  id: number;
  message?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const AddMovie = async ({ title }: AddMovieType): Promise<AddMovieResponse> => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_ENDPOINTS.MOVIES.GET_BY_NAME(title), {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao pesquisar filme");
  }

  const movieData = await response.json();

  if (!movieData.id) {
    throw new Error("ID do filme não encontrado na resposta");
  }
  if (!token) {
    throw new Error("Token não encontrado. Faça login novamente.");
  }
  const addResponse = await fetch(`${API_ENDPOINTS.USER.MOVIES}/${movieData.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!addResponse.ok) {
    const errorText = await addResponse.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || "Erro ao adicionar filme");
    } catch {
      throw new Error(errorText || "Erro desconhecido");
    }
  }

  return addResponse.json();
};

export const useAddMovie = (): UseMutationResult<AddMovieResponse, Error, AddMovieType> => {
  return useMutation({
    mutationFn: AddMovie,
    onError: (error) => {
      console.error("Erro na mutação:", error);
    },
  });
};
