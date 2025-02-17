import { useState } from "react";
import { useAddMovie } from "../../../../hooks/useAddMovie";
import { useQueryClient } from "@tanstack/react-query";

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
        onSuccess: () => {
          setMovieName("");
          onSuccess?.();
          queryClient.invalidateQueries({ queryKey: ["userMovies"] });
        },
        onError: () => {
          setMovieName("");
        },
      }
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
