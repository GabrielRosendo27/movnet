import { useMutation, UseMutationResult } from "@tanstack/react-query";

export interface AddMovieType {
  title: string;
}
export interface AddMovieResponse {
  message?: string;
}

const AddMovie = async ({ title }: AddMovieType): Promise<AddMovieResponse> => {
  const response = await fetch(`http://localhost:5000/Movie/${title}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao pesquisar filme");
  }
  return response.json();
};
export const useAddMovie = (): UseMutationResult<AddMovieResponse, Error, AddMovieType> => {
  return useMutation<AddMovieResponse, Error, AddMovieType>({ mutationFn: AddMovie });
};
