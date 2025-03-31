import { Button } from "../../buttons/Button";
import { Input } from "../../form/Input";
import { useActionNavigation } from "../../../../hooks/useActionNavigation";
import { useInputHandling } from "../hooks/useInputHandling";
import { useMovieAddition } from "../hooks/useMovieAddition";
import { useUsername } from "../../../features/start/hooks/useUsername";
import { useLogout } from "../../../../hooks/useLogout";

import { MenuMobile } from "./menu-mobile/MenuMobile";

export function StartMenu() {
  const { handleActionNavigation } = useActionNavigation();
  const { logout, isLoad } = useLogout();
  const { showInput, setShowInput, inputRef, inputElementRef } = useInputHandling();

  const { movieName, setMovieName, handleAddMovie, isPending, isError, error, validationError } = useMovieAddition();

  const { isLoading, usernameError, userName } = useUsername();

  const handleAddMovieWithValidation = () => {
    handleAddMovie(() => setShowInput(false));
  };
  return (
    <div className="flex items-center bg-myGray fixed top-0 left-0 w-full z-10 h-24">
      <ul className="hidden xl:flex gap-4 justify-between mx-12 items-center w-full">
        <li className="pb-2">
          <Button
            text="🎬 Movnet"
            className="text-myOrange text-3xl px-4 py-2 transition-transform duration-700 hover:text-myPurple hover:scale-105"
            onClick={() => handleActionNavigation("/")}
          />
        </li>
        <li className="pb-2">
          <Button text="Minha Lista" className="text-gray-300 text-lg hover:text-myPurple" onClick={() => handleActionNavigation("userlist")} />
        </li>

        <li className="flex items-center">
          <div className="mr-6 ">
            <div className="flex items-center justify-center bg-gray-800 rounded-xl pr-4 pl-4 gap-4">
              <img src="lupa.svg" alt="" className="w-6" />
              <Input
                text="Digite o nome do filme"
                type="text"
                className={`rounded-md bg-transparent text-md  `}
                ref={inputElementRef}
                onChange={(e) => setMovieName(e.target.value)}
                value={movieName}
                classNameDiv="w-[600px] max-2xl:w-[300px]"
              />
              <Button
                text={isPending ? "Adicionando..." : "Adicionar"}
                className={`px-4 py-2 text-sm text-white hover:bg-indigo-800 mb-4 ${isPending ? "bg-gray-500" : "bg-myOrange"}`}
                onClick={handleAddMovieWithValidation}
                disabled={isPending}
              />
            </div>

            <div className="absolute">
              {validationError && <p className="text-red-500 text-sm mt-1">{validationError}</p>}
              {isError && <p className="text-red-500 mt-1">{error?.message}</p>}
            </div>
          </div>
        </li>
        <div className="flex gap-6">
          <li className="pb-2">
            <Button
              text={isLoading ? "Carregando..." : `Olá, ${userName}`}
              className="bg-[#010C19] text-gray-500 text- px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
            />
            <p>{usernameError && usernameError?.message}</p>
          </li>
          <li className="pb-2">
            <Button text="Sair" className="px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800" onClick={() => logout()} disabled={isLoad} />
          </li>
        </div>
      </ul>

      <MenuMobile
        isLoading={isLoading}
        userName={userName}
        usernameError={usernameError}
        setShowInput={setShowInput}
        showInput={showInput}
        inputRef={inputRef}
        inputElementRef={inputElementRef}
        setMovieName={setMovieName}
        movieName={movieName}
        isPending={isPending}
        handleAddMovieWithValidation={handleAddMovieWithValidation}
        validationError={validationError}
        isError={isError}
        error={error}
        isLoad={isLoad}
        handleActionNavigation={handleActionNavigation}
        logout={logout}
      />
    </div>
  );
}
