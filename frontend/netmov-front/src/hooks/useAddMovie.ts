import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AddMovieResponse, AddMovieType } from "../types/movieTypes";
import { AddMovie } from "../api/addMovie";

export const useAddMovie = (): UseMutationResult<AddMovieResponse, Error, AddMovieType> => {
  return useMutation({
    mutationFn: AddMovie,

    onError: (error) => {
      console.error("Erro na mutação useAddMovie:", error);
    },
  });
};
