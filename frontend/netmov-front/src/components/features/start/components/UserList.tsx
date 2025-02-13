import { StartMenu } from "../../../ui/menu/components/StartMenu";
import { useUserMovies } from "../api/userMovies"; // Ou o caminho correto
import { MovieCard } from "./MovieCard"; // Componente assumido
import { Spinner } from "../../../../assets/Spinner"; // Componente de loading

export function UserList() {
  const { data: movies, isLoading, isError, error } = useUserMovies();

  return (
    <div className="bg-darkGradient w-screen h-screen text-white flex items-center justify-center gap-5">
      <StartMenu />

      <div className="border border-gray-900 w-[600px] h-[500px] p-4 flex flex-col">
        <h2 className="text-2xl mb-4 font-bold">Minha Lista</h2>

        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <Spinner />
          </div>
        )}

        {isError && <div className="flex-1 flex items-center justify-center text-red-500">{error.message}</div>}

        {!isLoading && !isError && (
          <ul className="flex-1 overflow-y-auto space-y-4">
            {movies?.length === 0 && <li className="text-center text-gray-400 mt-10">Nenhum filme na lista</li>}

            {movies?.map((movie) => (
              <li key={movie.id}>
                <MovieCard title={movie.title} year={movie.year} genre={movie.genre} imdbRating={movie.imdbRating} rottenRating={movie.rottenRating} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
