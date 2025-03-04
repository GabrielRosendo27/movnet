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
export interface MovieCardResumeProps {
  id: number;
  movieId: number;
  year: number;
  title: string;
  onRemove?: () => void;
  isRemoving: boolean;
  filePath?: string;
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
