import { Button } from "../../buttons/Button";
import { Input } from "../../form/Input";
import { useActionNavigation } from "../../../../hooks/useActionNavigation";
import { useInputHandling } from "../hooks/useInputHandling";
import { useMovieAddition } from "../hooks/useMovieAddition";
import { useUsername } from "../../../features/start/hooks/useUsername";
import { useLogout } from "../../../../hooks/useLogout";
import { useState } from "react";

export function StartMenu() {
  const { handleActionNavigation } = useActionNavigation();
  const { logout, isLoad } = useLogout();
  const { showInput, setShowInput, inputRef, inputElementRef } = useInputHandling();

  const { movieName, setMovieName, handleAddMovie, isPending, isError, error, validationError } = useMovieAddition();

  const { isLoading, usernameError, userName } = useUsername();

  const handleAddMovieWithValidation = () => {
    handleAddMovie(() => setShowInput(false));
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <div className="flex items-center bg-slate-900 fixed top-0 left-0 w-full z-10 h-24">
      <ul className="hidden md:flex gap-4 justify-between mx-12 items-center w-full">
        <li className="pb-2">
          <Button
            text="Movnet"
            className="bg-[#010C19] text-gray-500 px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
            onClick={() => handleActionNavigation("/")}
          />
        </li>
        <li className="pb-2">
          <div className="relative" ref={inputRef}>
            <Button text="+ Adicionar Filme" className="px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800" onClick={() => setShowInput(!showInput)} />

            <div
              className={`absolute left-[120%]  top-[5%] transition-all duration-500 ease-in-out max-2xl:left-[0%] max-2xl:top-[200%]
  ${showInput ? "opacity-100 pointer-events-auto z-0" : "opacity-0 pointer-events-none top-[100%]"}`}
            >
              <div className="flex items-center justify-center ">
                <Input
                  text="Digite o nome do filme"
                  type="text"
                  className={`rounded-sm bg-transparent text-md`}
                  ref={inputElementRef}
                  onChange={(e) => setMovieName(e.target.value)}
                  value={movieName}
                />
                <Button
                  text={isPending ? "Adicionando..." : "Adicionar"}
                  className={`px-4 py-2 text-sm text-white hover:bg-indigo-800 mb-5 ml-4 ${isPending ? "bg-gray-500" : "bg-myOrange"}`}
                  onClick={handleAddMovieWithValidation}
                  disabled={isPending}
                />
              </div>
              {validationError && <p className="text-red-500 text-sm mt-1">{validationError}</p>}
              {isError && <p className="text-red-500 mt-1">{error?.message}</p>}
            </div>
          </div>
        </li>
        <div className="flex gap-6">
          <li className="pb-2">
            <Button
              text={isLoading ? "Carregando..." : `Bem vindo, ${userName}`}
              className="bg-[#010C19] text-gray-500 text- px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
            />
            <p>{usernameError && usernameError?.message}</p>
          </li>
          <li className="pb-2">
            <Button text="Sair" className="px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800" onClick={() => logout()} disabled={isLoad} />
          </li>
        </div>
      </ul>
      <div className="md:hidden flex justify-end w-full p-4 mr-4">
        <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col gap-4 absolute top-[80px] right-[0px] bg-slate-900 p-4 rounded-md">
            <li>
              <Button
                text={isLoading ? "Carregando..." : `Bem vindo, ${userName}`}
                className="w-full bg-[#010C19] text-gray-500 px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
              />
              {usernameError && <p>{usernameError?.message}</p>}
            </li>
            <li>
              <Button text="+ Adicionar Filme" className=" px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800" onClick={() => setShowInput(!showInput)} />
              {showInput && (
                <div className="mt-2 transition-all duration-500 ease-in-out" ref={inputRef}>
                  <div className="flex items-center justify-center bg-transparent p-2 rounded-md shadow-md max-md:w-[300px] max-md:flex-col">
                    <Input
                      text="Digite o nome do filme"
                      type="text"
                      className="rounded-sm bg-transparent text-md border border-gray-300 px-2 py-1 max-md:mt-4"
                      ref={inputElementRef}
                      onChange={(e) => setMovieName(e.target.value)}
                      value={movieName}
                    />
                    <Button
                      text={isPending ? "Adicionando..." : "Adicionar"}
                      className={`px-4 py-2 text-sm text-white hover:bg-indigo-800 ml-4 ${isPending ? "bg-gray-500" : "bg-myOrange"}`}
                      onClick={handleAddMovieWithValidation}
                      disabled={isPending}
                    />
                  </div>
                  {validationError && <p className="text-red-500 text-sm mt-1">{validationError}</p>}
                  {isError && <p className="text-red-500 mt-1">{error?.message}</p>}
                </div>
              )}
            </li>
            <li>
              <Button text="Sair" className=" px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800" onClick={() => logout()} disabled={isLoad} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
