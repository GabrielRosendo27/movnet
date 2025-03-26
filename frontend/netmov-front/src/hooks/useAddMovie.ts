import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { AddMovieResponse, AddMovieType } from "../types/movieTypes";
import { AddMovie } from "../api/addMovie";

export type MutationContext = {
  previousTotal?: number;
};

export const useAddMovie = (): UseMutationResult<AddMovieResponse, Error, AddMovieType, MutationContext> => {
  return useMutation({
    mutationFn: AddMovie,

    onError: (error) => {
      console.error("Erro na mutação useAddMovie:", error);
    },
  } as UseMutationOptions<AddMovieResponse, Error, AddMovieType, MutationContext>);
};
