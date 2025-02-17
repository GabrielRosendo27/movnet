import { MovieCardProps } from "../types/types";

export function MovieCard({ title, year, genre, imdbRating, rottenRating, filePath }: MovieCardProps) {
  return (
    <div className="flex gap-3">
      <img src={filePath} alt="poster" />
      <div className="flex flex-col gap-3">
        <span>{title}</span>
        <span>{year}</span>
        <span>{genre.join(", ")}</span>
        <div className="flex gap-1">
          <img src="star.svg" width={16} />
          <span className="mr-1">{imdbRating}</span>
          <img src="star.svg" className="ml-1" width={16} />
          <span>85%{rottenRating}</span>
        </div>
      </div>
    </div>
  );
}
