import { MainMenu } from "../../menu/MainMenu";
import { useUserMovies } from "./hooks/useUserMovies"; // Ou o caminho correto
import { MovieCard } from "../user-list/MovieCard"; // Componente assumido
import { Spinner } from "../../../assets/Spinner"; // Componente de loading

export function UserList() {
  const { data: movies, isLoading, isError, error } = useUserMovies();

  return (
    <div className="bg-darkGradient w-screen h-screen text-white flex items-center justify-center gap-5">
      <MainMenu />

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
                <MovieCard
                  title={movie.Title}
                  year={movie.Year}
                  overview={movie.Overview}
                  onRemove={() => {
                    /* Implementar remoção */
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
