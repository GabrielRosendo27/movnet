import { UseMutateFunction } from "@tanstack/react-query";

export interface MenuMobileProps {
  isLoading: boolean;
  userName: string | undefined;
  usernameError: Error | null;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  showInput: boolean;
  inputRef: React.RefObject<HTMLDivElement>;
  inputElementRef: React.RefObject<HTMLInputElement>;
  setMovieName: React.Dispatch<React.SetStateAction<string>>;
  movieName: string | undefined;
  isPending: boolean;
  handleAddMovieWithValidation: () => void;
  validationError: string | undefined;
  isError: boolean;
  error: Error | null;
  isLoad: boolean;
  handleActionNavigation: (action: string) => void;
  logout: UseMutateFunction<Response, Error, void, unknown>;
}

export interface MenuMobileSvgProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}
export interface UsernameTextProps {
  isLoading: boolean;
  userName: string | undefined;
  usernameError: Error | null;
}
export interface MenuMobileInputProps {
  inputElementRef: React.RefObject<HTMLInputElement>;
  setMovieName: React.Dispatch<React.SetStateAction<string>>;
  validationError: string | undefined;
  isError: boolean;
  error: Error | null;
  isPending: boolean;
  handleAddMovieWithValidation: () => void;
  movieName: string | undefined;
  inputRef: React.RefObject<HTMLDivElement>;
  showInput: boolean;
}
