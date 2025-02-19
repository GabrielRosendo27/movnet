export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  imdbRating: number;
  rottenRating: number;
  filePath?: string;
  runtime: number;
  movieId: number;
}
export interface MovieCardProps {
  id: number;
  movieId: number;
  title: string;
  year: number;
  genre: string[];
  imdbRating: number;
  rottenRating: number;
  filePath?: string;
  runtime: number;
  onRemove?: () => void;
  isRemoving: boolean;
}
