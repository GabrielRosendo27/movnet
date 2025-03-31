import { StartMenu } from "../../../ui/menu/components/StartMenu";
import { useUserMovies } from "../api/userMovies"; // Ou o caminho correto
import { MovieCard } from "./MovieCard"; // Componente assumido
import { Spinner } from "../../../../assets/Spinner"; // Componente de loading
import useRemoveMovie from "../../../../hooks/useRemoveMovie";
import { useState } from "react";
import { MovieCardResume } from "./MovieCardResume";

export function UserList() {
  const { data: movies, isLoading, isError, error } = useUserMovies();
  const { mutate: removeMovie, isPending: isRemoving, error: removeError } = useRemoveMovie();
  const [layout, setLayout] = useState("1");
  const handleLayoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLayout(event.target.value);
  };

  return (
    <div className="bg-myGray w-screen h-screen text-white overflow-x-hidden scroll-container flex items-center justify-center">
      <StartMenu />

      <div className="p-4">
        {(isLoading || isRemoving) && (
          <div className="flex-1 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {isError && <div className="flex-1 flex items-center justify-center text-red-500">{error.message}</div>}
        {removeError && <div className="flex-1 flex items-center justify-center text-red-500">{removeError.message}</div>}
        {!isLoading && !isError && (
          <div className="h-[calc(100vh-18rem)]">
            <div>
              <span>Modo de exibição:</span>
              <form>
                <div>
                  <input type="radio" id="layout1" name="layout" value="1" onChange={handleLayoutChange} checked={layout === "1"} />
                  <label htmlFor="layout1" className="ml-2 cursor-pointer">
                    Padrão
                  </label>
                </div>
                <div>
                  <input type="radio" id="layout2" name="layout" value="2" onChange={handleLayoutChange} checked={layout === "2"} />
                  <label htmlFor="layout2" className="ml-2 cursor-pointer">
                    Resumido
                  </label>
                </div>
              </form>
            </div>
            {movies?.length === 0 && <li className="text-center text-gray-400 mt-10">Nenhum filme na lista</li>}
            <div>
              <ul className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 p-6 gap-10">
                {layout === "1" &&
                  movies?.map((movie) => (
                    <li key={movie.id} className="bg-slate-900 cursor-pointer rounded-xl border border-gray-800 hover:opacity-85 w-[270px] ">
                      <MovieCard
                        id={movie.id}
                        movieId={movie.movieId}
                        filePath={movie.filePath}
                        title={movie.title}
                        year={movie.year}
                        runtime={movie.runtime}
                        genre={movie.genre}
                        imdbRating={movie.imdbRating}
                        rottenRating={movie.rottenRating}
                        onRemove={() => removeMovie(movie.movieId)}
                        isRemoving={isRemoving}
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <ul className="flex flex-col gap-2">
                {layout === "2" &&
                  movies?.map((movie) => (
                    <li key={movie.id} className="bg-slate-900 cursor-pointer rounded-sm hover:opacity-85 p-4">
                      <MovieCardResume
                        movieId={movie.movieId}
                        id={movie.id}
                        title={movie.title}
                        year={movie.year}
                        imdbRating={movie.imdbRating}
                        rottenRating={movie.rottenRating}
                        runtime={movie.runtime}
                        genre={movie.genre}
                        onRemove={() => removeMovie(movie.movieId)}
                        isRemoving={isRemoving}
                        filePath={movie.filePath}
                        dateAdded={movie.dateAdded}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
