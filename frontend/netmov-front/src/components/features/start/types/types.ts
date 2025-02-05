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
  Title: string;
  PosterPath: string;
  Year: number;
  IMDBRating: number;
  Overview: string;
}
