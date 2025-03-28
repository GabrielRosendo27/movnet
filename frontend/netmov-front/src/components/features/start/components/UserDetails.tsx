import { TotalHours } from "../api/totalHours";
import { TotalUserMovies } from "../api/totalMovies";
import { useUserMovies } from "../api/userMovies";

export function UserDetails() {
  const { data: totalMovies, isLoading: isLoadingMovies, error: moviesError, isFetching: isFetchingMovies } = TotalUserMovies();
  const { data: movies } = useUserMovies();
  const { data: totalHours, isLoading: isLoadingHours, error: hoursError, isFetching: isFetchingHours } = TotalHours();
  const displayTotal = () => {
    if (totalMovies !== undefined) return totalMovies;
    if (movies?.length !== undefined) return movies.length;
    return "-";
  };

  return (
    <>
      <div className="mt-48 text-red-200 flex flex-col p-4">
        <div className="flex flex-col">
          {(isLoadingMovies || isLoadingHours) && <div>Carregando...</div>}
          {(moviesError || hoursError) && <div>Erro ao carregar dados</div>}
          <span>Número total de filmes assistidos: {displayTotal()} </span>
          {isFetchingMovies && <span className="ml-2 text-sm">↻</span>}

          <span>Horas totais de filmes assistidos: {totalHours ?? 0} horas </span>
          {isFetchingHours && <span className="text-sm">↻</span>}
        </div>
        {/* <span>Gêneros preferidos:</span>
        <span>Atividade mensal ou semanal:</span>
        <span>Últimas atividades (Adição e Remoção):</span> */}
      </div>
    </>
  );
}
