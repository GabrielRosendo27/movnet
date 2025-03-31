import CountUp from "react-countup";
import { TotalUserMovies } from "../api/totalMovies";
import { useUserMovies } from "../api/userMovies";

export function DisplayTotal() {
  const { data: totalMovies, isLoading, error, isFetching } = TotalUserMovies();
  const { data: movies } = useUserMovies();

  const displayTotal = () => {
    if (totalMovies !== undefined) return totalMovies;
    if (movies?.length !== undefined) return movies.length;
    return 0;
  };

  return (
    <div className="flex flex-col">
      {isLoading && <div>Carregando...</div>}
      {error && <div>Erro ao carregar dados</div>}
      <span>Filmes Assistidos</span>
      <CountUp
        end={displayTotal()}
        duration={2.5}
        separator=","
        decimals={0}
        className="mx-auto text-6xl text-myPurple max-md:text-3xl max-md:mx-0"
        startOnMount={false}
        useEasing={true}
        easingFn={(t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b}
        delay={0.3}
      />
      {isFetching && <span className="ml-2 text-sm">↻</span>}
    </div>
  );
}
