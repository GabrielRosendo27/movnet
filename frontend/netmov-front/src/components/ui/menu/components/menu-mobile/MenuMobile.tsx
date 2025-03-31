import { useState } from "react";
import { Button } from "../../../buttons/Button";
import { MenuMobileProps } from "../../types/types";

import { MenuMobileSvg } from "./MenuMobileSvg";
import { MovnetText } from "./MovnetText";
import { MenuMobileCloseSvg } from "./MenuMobileCloseSvg";
import { UsernameText } from "./UsernameText";
import { MenuMobileInput } from "./MenuMobileInput";

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
        <MenuMobileSvg toggleMenu={toggleMenu} menuOpen={menuOpen} />
        <MovnetText />

        {menuOpen && (
          <>
            <div className="fixed inset-0 bg-black opacity-30 z-40 animate-fadeIn" onClick={toggleMenu}></div>

            <div className="xl:hidden fixed top-0 left-0 z-50">
              <ul
                className={`flex flex-col absolute top-[0px] left-[0px] w-[220px] h-screen bg-myGray rounded-md leading-relaxed tracking-wide text-lg ${
                  isAnimating ? "animate-menuOut" : "animate-menuIn"
                } `}
              >
                <MenuMobileCloseSvg menuOpen={menuOpen} toggleMenu={toggleMenu} />
                <UsernameText isLoading={isLoading} userName={userName} usernameError={usernameError} />

                <li className="hover:bg-gray-900 p-2 rounded-sm cursor-pointer w-full text-gray-300 pl-4">
                  <Button text="Adicionar Filme" className="pb-2" onClick={() => setShowInput(!showInput)} />
                  {showInput && (
                    <>
                      <MenuMobileInput
                        inputElementRef={inputElementRef}
                        setMovieName={setMovieName}
                        movieName={movieName}
                        validationError={validationError}
                        isError={isError}
                        error={error}
                        isPending={isPending}
                        handleAddMovieWithValidation={handleAddMovieWithValidation}
                        inputRef={inputRef}
                        showInput={showInput}
                      />
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
