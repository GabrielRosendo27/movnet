import { StartMenu } from "../../../ui/menu/components/StartMenu";
import { useUserMovies } from "../api/userMovies"; // Ou o caminho correto
import { MovieCard } from "./MovieCard"; // Componente assumido
import { Spinner } from "../../../../assets/Spinner"; // Componente de loading

export function UserList() {
  const { data: movies, isLoading, isError, error } = useUserMovies();

  return (
    <div className="bg-darkGradient w-screen h-screen text-white flex items-center justify-center max-md:h-full overflow-x-hidden">
      <StartMenu />
      <div className="p-4">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {isError && <div className="flex-1 flex items-center justify-center text-red-500">{error.message}</div>}
        {!isLoading && !isError && (
          <div>
            <ul className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 w-screen p-6 max-xl:mt-80 max-md:mt-[992px]">
              {movies?.length === 0 && <li className="text-center text-gray-400 mt-10">Nenhum filme na lista</li>}

              {movies?.map((movie) => (
                <li key={movie.id} className="hover:bg-slate-900 cursor-pointer p-4">
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
          </div>
        )}
      </div>
    </div>
  );
}
