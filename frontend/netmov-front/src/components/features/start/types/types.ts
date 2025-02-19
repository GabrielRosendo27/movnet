export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  imdbRating: number;
  rottenRating: number;
  filePath?: string;
  runtime: number;
}
export interface MovieCardProps {
  id: number;
  title: string;
  year: number;
  genre: string[];
  imdbRating: number;
  rottenRating: number;
  filePath?: string;
  runtime: number;
  onRemove?: () => void;
}
