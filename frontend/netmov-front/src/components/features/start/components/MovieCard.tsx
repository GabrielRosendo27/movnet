import { MovieCardProps } from "../types/types";

export function MovieCard({ title, year, genre, imdbRating, rottenRating, filePath }: MovieCardProps) {
  return (
    <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 mt-48">
      <div>
        <img src={filePath} alt="poster" />
        <span>{title}</span>
        <span>{year}</span>
        <span>{genre}</span>
        <div className="flex gap-2">
          <span>{imdbRating}</span>
          <span>{rottenRating}</span>
        </div>
      </div>
    </div>
  );
}
