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
    <div className="flex gap-3">
      <img src={filePath} alt="poster" />
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-myOrange">{id}. </span>
          <span>{title}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-myPurple">|</span>
          <span>{year}</span>
          <span className="text-myPurple">|</span>
          {runtime ? <span>{formatRuntime(runtime)}</span> : "-"}
        </div>
        <div className="flex gap-2">
          <span className="text-myPurple">|</span>
          {genre && genre.length > 0 ? (
            <>
              <span>{genre[0]}</span> <span>{genre[1]}</span>
            </>
          ) : (
            "Não Encontrado"
          )}
        </div>
        <div className="flex items-center w-[18vh]">
          <div className="flex gap-1">
            <span className="text-myPurple">|</span>
            <img src="star.svg" width={16} />
            <span className="mr-1">{imdbRating ? imdbRating.toFixed(1) : "-"}</span>
            <img src="tomato.svg" className="ml-1" width={16} />
            <span>{rottenRating ? `${rottenRating}%` : "-"}</span>
          </div>
          <div className="flex items-center">
            <span className="text-myPurple ml-4">|</span>
            <button onClick={onRemove} disabled={isRemoving} className="ml-auto p-2 hover:opacity-50 transition-opacity duration-200 flex gap-2 items-center">
              <img src="trash.svg" width={16} alt="trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
