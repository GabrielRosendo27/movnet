import { MovieCardProps } from "../types/types";

export function MovieCard({ title, year, genre, imdbRating, rottenRating, filePath }: MovieCardProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-4 p-4 w-full hover:bg-slate-900 cursor-pointer">
        <div>
          <img src={filePath} alt="poster" />
        </div>
        <div className="flex flex-col gap-3">
          <span>{title}</span>
          <span>{year}</span>
          <span>{genre}</span>
          <div className="flex gap-2">
            <span>{imdbRating}</span>
            <span>{rottenRating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
