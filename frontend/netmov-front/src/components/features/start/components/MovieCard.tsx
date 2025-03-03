import { MovieCardProps } from "../types/types";

export function MovieCard({ title, year, genre, imdbRating, rottenRating, filePath, runtime, id, onRemove, isRemoving }: MovieCardProps) {
  function formatRuntime(runtime: number) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours === 0) {
      return `${minutes}min`;
    }
    if (minutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}min`;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={filePath} alt="poster" className="w-[270px] rounded-2xl object-cover" />
      <div className="flex flex-col p-1 text-lg">
        <div className="w-[270px] flex items-center gap-2 p-2 border-b border-slate-800">
          <span className="text-myOrange text-xl">{id}. </span>
          <span className="truncate">{title}</span>
        </div>
        <div className="flex gap-2 mt-2 mb-1 justify-between ml-4">
          <span>{year}</span>

          {runtime ? <span className="mr-6">{formatRuntime(runtime)}</span> : "-"}
        </div>
        <div className="flex gap-2 border-b border-slate-800 ml-4">
          <span className="text-myPurple text-xl">|</span>
          {genre && genre.length > 0 ? (
            <>
              <span className="mb-2">{genre[0]}</span>
            </>
          ) : (
            "Não Encontrado"
          )}
        </div>
        <div className="flex items-center mt-2 mb-2 ml-2 justify-between">
          <div className="flex gap-1">
            {/* <span className="text-myPurple text-xl">|</span> */}
            <img src="star.svg" className="w-5" />
            <span className="mr-1">{imdbRating ? imdbRating.toFixed(1) : "-"}</span>
            <img src="tomato.svg" className="ml-1 w-6" />
            <span>{rottenRating ? `${rottenRating}%` : "-"}</span>
          </div>
          <div className="flex items-center mr-4">
            <span className="text-myPurple text-2xl">|</span>
            <button onClick={onRemove} disabled={isRemoving} className=" hover:opacity-50 transition-opacity duration-200 p-2">
              <img src="trash.svg" className="w-4 flex-shrink-0" alt="trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
