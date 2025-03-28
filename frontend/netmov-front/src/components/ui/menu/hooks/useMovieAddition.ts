import { useState } from "react";
import { useAddMovie } from "../../../../hooks/useAddMovie";
import { useQueryClient } from "@tanstack/react-query";
import type { MutationContext } from "../../../../hooks/useAddMovie";

export function useMovieAddition() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useAddMovie();
  const [movieName, setMovieName] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleAddMovie = (onSuccess?: () => void) => {
    if (movieName.trim() === "") {
      setValidationError("Por favor, digite o nome do filme.");
      return;
    }

    setValidationError("");

    mutate(
      { title: movieName },
      {
        onMutate: async () => {
          await queryClient.cancelQueries({ queryKey: ["totalUserMovies"] });
          const previousTotal = queryClient.getQueryData<number>(["totalUserMovies"]);

          if (typeof previousTotal === "number") {
            queryClient.setQueryData(["totalUserMovies"], previousTotal + 1);
          }

          return { previousTotal };
        },
        onError: (context: MutationContext | undefined) => {
          if (context?.previousTotal !== undefined) {
            queryClient.setQueryData(["totalUserMovies"], context.previousTotal);
          }
        },
        onSuccess: () => {
          setMovieName("");
          onSuccess?.();
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["userMovies"] });
          queryClient.invalidateQueries({ queryKey: ["totalUserMovies"] });
          queryClient.invalidateQueries({ queryKey: ["totalHours"] });
        },
      } as Parameters<typeof mutate>[1] // Type assertion para corrigir a tipagem
    );
  };

  return {
    movieName,
    setMovieName,
    handleAddMovie,
    isPending,
    isError,
    error,
    validationError,
  };
}
