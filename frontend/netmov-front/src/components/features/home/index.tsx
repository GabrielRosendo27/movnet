import { useActionNavigation } from "../../../hooks/useActionNavigation";
import { Button } from "../../ui/buttons/Button";
import { Menu } from "../../ui/menu/components/Menu";
import { usePopularMovies } from "./api/usePopularMovies";
import { useTopRatedMovies } from "./api/useTopRatedMovies";

import { Description } from "./components/Description";
export function Home() {
  const { handleActionNavigation } = useActionNavigation();
  const { data, isLoading, isError } = usePopularMovies();
  const { data: topRated, isLoading: topRatedLoading, isError: topRatedError } = useTopRatedMovies();

  return (
    <div className="bg-myGray w-screen h-screen overflow-x-hidden ">
      <Menu />
      <div className="container mx-auto p-4 mt-48">
        <div className="flex gap-10">
          <div className="flex items-center flex-col h-max">
            <Description />
            <Button
              onClick={() => handleActionNavigation("register")}
              text="Começar"
              className="bg-myPurple text-xl text-white px-8 py-4 hover:bg-indigo-800 mb-8 mt-8 animate-fadeSlideDown"
            />
            <div className="border-t border-slate-700 w-full">
              <p className="text-white text-3xl mt-6">Destaques com as maiores notas ⭐</p>
              {topRatedLoading && <p className="text-gray-400">Carregando filmes...</p>}

              {topRatedError && <p className="text-red-400">Erro ao carregar filmes</p>}
              {topRated && (
                <div className="grid grid-cols-3">
                  {topRated.map((movie) => (
                    <div key={movie.id} className="p-4 text-white rounded-lg transition cursor-pointer hover:scale-105">
                      {movie.posterPath.includes(".jpg") ? (
                        <img src={movie.posterPath} alt={`Poster de ${movie.title}`} className="w-[280px] h-[300px] object-cover rounded mb-2 " />
                      ) : (
                        "Imagem não Disponível"
                      )}

                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-gray-400">{new Date(movie.releaseDate).toLocaleDateString("pt-BR")}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm">{movie.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="text-white text-3xl">Filmes mais populares recentemente 🚀</p>
            {isLoading && <p className="text-gray-400">Carregando filmes...</p>}

            {isError && <p className="text-red-400">Erro ao carregar filmes</p>}
            {data && (
              <div className="grid grid-cols-3">
                {data.map((movie) => (
                  <div key={movie.id} className="p-4 text-white rounded-lg transition cursor-pointer hover:scale-105">
                    {movie.posterPath.includes(".jpg") ? (
                      <img src={movie.posterPath} alt={`Poster de ${movie.title}`} className="w-[280px] h-[300px] object-cover rounded mb-2 " />
                    ) : (
                      "Imagem não Disponível"
                    )}

                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-400">{new Date(movie.releaseDate).toLocaleDateString("pt-BR")}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm">{movie.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
