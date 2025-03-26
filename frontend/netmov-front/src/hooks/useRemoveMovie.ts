import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RemoveMovieResponse } from "../types/movieTypes";
import { removeMovie } from "../api/removeMovie";

const useRemoveMovie = () => {
  const queryClient = useQueryClient();

  return useMutation<RemoveMovieResponse, Error, number>({
    mutationFn: removeMovie,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMovies"] });
      queryClient.invalidateQueries({
        queryKey: ["totalUserMovies"],
      });
    },

    onError: (error) => {
      console.error("Erro ao remover o filme:", error);
    },
  });
};

export default useRemoveMovie;
