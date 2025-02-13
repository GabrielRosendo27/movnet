import { API_ENDPOINTS } from "./api";
import { AddMovieResponse, AddMovieType } from "../types/movieTypes";
import { addResponse } from "../components/features/start/api/addResponse";

export const AddMovie = async ({ title }: AddMovieType): Promise<AddMovieResponse> => {
  const token = localStorage.getItem("authToken");

  if (!token) throw new Error("Token não encontrado. Faça login novamente.");

  const response = await fetch(API_ENDPOINTS.MOVIES.GET_BY_NAME(title), {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Erro ao pesquisar filme");

  const movieData = await response.json();
  if (movieData) {
    console.log("Resposta método addMovie: ", movieData);
  }
  if (movieData.id) {
    console.log("Esse é o movieID: ", movieData.id);
  } else {
    throw new Error("ID do filme não encontrado na resposta");
  }

  return addResponse(movieData.id, token);
};
