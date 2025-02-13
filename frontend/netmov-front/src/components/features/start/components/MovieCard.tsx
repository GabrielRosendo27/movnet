import { MovieCardProps } from "../types/types";

export function MovieCard({ title, year, genre, imdbRating, rottenRating }: MovieCardProps) {
  return (
    <div className="flex items-center justify-center">
      <div>
        {title}
        {year}
      </div>
      <div>{genre}</div>
      <div>
        {imdbRating}
        {rottenRating}
      </div>
    </div>
  );
}
