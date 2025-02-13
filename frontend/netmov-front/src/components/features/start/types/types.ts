export interface MovieCardProps {
  title: string;
  year: number;
  overview: string;
  rating?: number;
  posterUrl?: string;
  onRemove?: () => void;
}

export interface Movie {
  id: number;
  title: string;
  posterPath?: string;
  year: number;
  IMDBRating: number;
  overview: string;
}
