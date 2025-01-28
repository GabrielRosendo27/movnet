// import { useEffect } from "react";
// import { useFetchUserName } from "../login/hooks/useFetchUserName";

import { MainMenu } from "../menu/MainMenu";
import { LatestMovies } from "./latest-movies/LatestMovies";
import { MovieBestRated } from "./movie-best-rated/MovieBestRated";

export function Main() {
  // const { fetchUserName, isLoading, error, userName } = useFetchUserName();

  // useEffect(() => {
  //   fetchUserName();
  // }, [fetchUserName]);

  // if (isLoading) {
  //   return <p>Carregando...</p>;
  // }
  // if (error) {
  //   return <p>Erro ao carregar Usuário. {error.message}</p>;
  // }

  return (
    <>
      <div className="bg-darkGradient w-screen h-screen text-white flex items-center justify-center">
        <MainMenu />
        <LatestMovies />
        <MovieBestRated />
      </div>
    </>
  );
}
