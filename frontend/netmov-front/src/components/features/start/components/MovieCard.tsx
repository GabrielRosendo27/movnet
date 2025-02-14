import { MovieCardProps } from "../types/types";

export function MovieCard({ title, year, genre, imdbRating, rottenRating, filePath }: MovieCardProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-4 w-full bg-gray-900 p-4">
        <img src={filePath} alt="poster" />
        <div className="flex flex-col">
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
