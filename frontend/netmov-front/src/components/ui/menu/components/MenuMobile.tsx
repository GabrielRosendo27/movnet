import { useState } from "react";
import { Button } from "../../buttons/Button";
import { MenuMobileProps } from "../types/types";
import { Input } from "../../form/Input";

export function MenuMobile({
  isLoading,
  userName,
  usernameError,
  setShowInput,
  showInput,
  inputRef,
  inputElementRef,
  setMovieName,
  movieName,
  isPending,
  handleAddMovieWithValidation,
  validationError,
  isError,
  error,
  isLoad,
  handleActionNavigation,
  logout,
}: MenuMobileProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setMenuOpen(!menuOpen);
        setIsAnimating(false);
      }, 300);
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <>
      <>
        <div className="hidden max-xl:flex ml-6 pt-1 relative w-6 h-6">
          <button onClick={toggleMenu} className="text-gray-500 focus:outline-none w-full h-full relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute inset-0 h-6 w-6 transition-opacity duration-150 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="xl:hidden flex justify-center items-center w-full p-4 ">
          <Button
            text="🎬 Movnet"
            className="text-myOrange text-3xl px-4 py-2 transition-transform duration-300 hover:text-myPurple hover:scale-105"
            onClick={() => handleActionNavigation("/")}
          />
        </div>

        {menuOpen && (
          <>
            <div className="fixed inset-0 bg-black opacity-30 z-40 animate-fadeIn" onClick={toggleMenu}></div>

            <div className="xl:hidden fixed top-0 left-0 z-50">
              <ul
                className={`flex flex-col absolute top-[0px] left-[0px] w-[220px] h-screen bg-myGray rounded-md leading-relaxed tracking-wide text-lg ${
                  isAnimating ? "animate-menuOut" : "animate-menuIn"
                } `}
              >
                <div className="cursor-pointer p-4 relative left-[175px] top-[20px]" onClick={toggleMenu}>
                  <img
                    src="close.svg"
                    alt="close"
                    className={`absolute inset-0 h-6 w-6 transition-opacity duration-150 ease-in-out ${menuOpen ? "opacity-100" : "opacity-0"}`}
                  />
                </div>
                <li className="hover:bg-gray-900 p-3 rounded-sm cursor-pointer w-full text-gray-300 mt-8 pl-4">
                  <span className="flex pt-2 text-myPurple">
                    {isLoading ? (
                      "Carregando..."
                    ) : (
                      <>
                        <span className="mr-2">Olá,</span> <span className="text-gray-300">{userName}</span>
                      </>
                    )}
                  </span>

                  {usernameError && <p>{usernameError?.message}</p>}
                </li>
                <li className="hover:bg-gray-900 p-2 rounded-sm cursor-pointer w-full text-gray-300 pl-4">
                  <Button text="Adicionar Filme" className="pb-2" onClick={() => setShowInput(!showInput)} />
                  {showInput && (
                    <>
                      <div className="absolute top-[180px] left-[3px] mt-2 transition-all duration-500 ease-in-out " ref={inputRef}>
                        <div
                          className={`bg-slate-800 h-max p-4 rounded-md shadow-md max-md:w-[350px] flex-1 transition-all duration-300 ${
                            showInput ? "animate-inputSlideIn" : "animate-inputSlideOut"
                          }`}
                        >
                          <div className={`flex items-center justify-center flex-col `}>
                            <div className="flex p-4 bg-gray-700 rounded-xl">
                              <img src="lupa.svg" alt="lupa" className="w-6 mb-2 mr-2" />
                              <Input
                                text="Digite o nome do filme"
                                type="text"
                                className="rounded-md bg-transparent text-md"
                                ref={inputElementRef}
                                onChange={(e) => setMovieName(e.target.value)}
                                value={movieName}
                              />
                            </div>
                            {validationError && <p className="text-red-500 text-sm mt-1">{validationError}</p>}
                            {isError && <p className="text-red-500 mt-1">{error?.message}</p>}
                            <div>
                              <Button
                                text={isPending ? "Adicionando..." : "Adicionar"}
                                className={`px-4 py-2 text-sm text-white hover:bg-indigo-800 ml-4 ${isPending ? "bg-gray-500" : "bg-myOrange"}`}
                                onClick={handleAddMovieWithValidation}
                                disabled={isPending}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </li>

                <li className="hover:bg-gray-900 p-2 rounded-sm cursor-pointer w-full text-gray-300">
                  <Button text="Sair" className="pb-2 pl-2" onClick={() => logout()} disabled={isLoad} />
                </li>
              </ul>
            </div>
          </>
        )}
      </>
    </>
  );
}
