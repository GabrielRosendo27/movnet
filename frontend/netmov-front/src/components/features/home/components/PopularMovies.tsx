import { usePopularMovies } from "../api/usePopularMovies";

export function PopularMovies() {
  const { data, isLoading, isError } = usePopularMovies();
  return (
    <div className="">
      <div className="max-md:border-t border-slate-700 w-full"></div>
      <p className="text-white text-3xl mt-6">Filmes mais populares recentemente 🚀</p>
      {isLoading && <p className="text-gray-400">Carregando filmes...</p>}

      {isError && <p className="text-red-400">Erro ao carregar filmes</p>}
      {data && (
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-2 max-lg:grid-cols-1">
          {data.map((movie) => (
            <div key={movie.id} className="p-4 text-white rounded-lg transition cursor-pointer hover:scale-105">
              {movie.posterPath.includes(".jpg") ? (
                <img src={movie.posterPath} alt={`Poster de ${movie.title}`} className="w-[280px] h-[300px] object-cover rounded mb-2 max-md:object-contain" />
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
  );
}
