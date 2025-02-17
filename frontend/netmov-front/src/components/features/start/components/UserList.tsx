import { StartMenu } from "../../../ui/menu/components/StartMenu";
import { useUserMovies } from "../api/userMovies"; // Ou o caminho correto
import { MovieCard } from "./MovieCard"; // Componente assumido
import { Spinner } from "../../../../assets/Spinner"; // Componente de loading

export function UserList() {
  const { data: movies, isLoading, isError, error } = useUserMovies();

  return (
    <div className="bg-darkGradient w-screen h-screen text-white flex items-center justify-center max-md:h-full overflow-x-hidden">
      <StartMenu />
      <div className="p-4 w-full">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {isError && <div className="flex-1 flex items-center justify-center text-red-500">{error.message}</div>}
        {!isLoading && !isError && (
          <ul>
            {movies?.length === 0 && <li className="text-center text-gray-400 mt-10">Nenhum filme na lista</li>}

            {movies?.map((movie) => (
              <li key={movie.id}>
                <MovieCard
                  filePath={movie.filePath}
                  title={movie.title}
                  year={movie.year}
                  genre={movie.genre}
                  imdbRating={movie.imdbRating}
                  rottenRating={movie.rottenRating}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
