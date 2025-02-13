export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  imdbRating: number;
  rottenRating: number;
  filePath?: string;
}
export interface MovieCardProps {
  title: string;
  year: number;
  genre: string[];
  imdbRating: number;
  rottenRating: number;
  filePath?: string;
  onRemove?: () => void;
}
