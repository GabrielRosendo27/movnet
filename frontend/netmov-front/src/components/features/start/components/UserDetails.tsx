import { TotalUserMovies } from "../api/totalMovies";
import { useUserMovies } from "../api/userMovies";

export function UserDetails() {
  const { data: totalMovies, isLoading, error, isFetching } = TotalUserMovies();
  const { data: movies } = useUserMovies();

  const displayTotal = () => {
    if (totalMovies !== undefined) return totalMovies;
    if (movies?.length !== undefined) return movies.length;
    return "-";
  };

  return (
    <>
      <div className="mt-48 text-red-200 flex flex-col p-4">
        <div className="flex flex-col">
          {isLoading && <div>Carregando...</div>}
          {error && <div>{error.message}</div>}
          <span>Número total de filmes assistidos: {displayTotal()} </span>
          {isFetching && <span className="ml-2 text-sm">↻</span>}

          <span>Horas totais de filmes assistidos:</span>

          <span>Gêneros preferidos:</span>
        </div>
        <span>Atividade mensal ou semanal:</span>
        <span>Últimas atividades (Adição e Remoção):</span>
      </div>
    </>
  );
}
