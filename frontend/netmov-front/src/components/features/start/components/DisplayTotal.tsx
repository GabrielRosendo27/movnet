import { TotalUserMovies } from "../api/totalMovies";
import { useUserMovies } from "../api/userMovies";

export function DisplayTotal() {
  const { data: totalMovies, isLoading, error, isFetching } = TotalUserMovies();
  const { data: movies } = useUserMovies();

  const displayTotal = () => {
    if (totalMovies !== undefined) return totalMovies;
    if (movies?.length !== undefined) return movies.length;
    return "-";
  };

  return (
    <div className="flex flex-col">
      {isLoading && <div>Carregando...</div>}
      {error && <div>{error.message}</div>}
      <span>Filmes assistidos: {displayTotal()} </span>
      {isFetching && <span className="ml-2 text-sm">↻</span>}
    </div>
  );
}
