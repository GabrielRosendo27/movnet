import { Button } from "../../buttons/Button";
import { Input } from "../../form/Input";
import { useActionNavigation } from "../../../../hooks/useActionNavigation";
import { useInputHandling } from "../hooks/useInputHandling";
import { useMovieAddition } from "../hooks/useMovieAddition";

export function StartMenu() {
  const { handleActionNavigation } = useActionNavigation();

  const { showInput, setShowInput, inputRef, inputElementRef } = useInputHandling();

  const { movieName, setMovieName, handleAddMovie, isPending, isError, error, validationError } = useMovieAddition();

  const handleAddMovieWithValidation = () => {
    handleAddMovie(() => setShowInput(false));
  };

  return (
    <div className="p-4 bg-[#010C19] fixed top-0 left-0 w-full z-10">
      <ul className="flex gap-4 justify-between mx-12 items-center">
        <li>
          <Button
            text="Movnet"
            className="bg-[#010C19] text-gray-500 text- px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
            onClick={() => handleActionNavigation("start")}
          />
        </li>
        <li>
          <div className="relative" ref={inputRef}>
            <Button text="+ Adicionar Filme" className="px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800" onClick={() => setShowInput(!showInput)} />

            <div
              className={`absolute left-[-50%] top-[130%] transition-all duration-500 ease-in-out  ${
                showInput ? "opacity-100 pointer-events-auto z-0" : "opacity-0 pointer-events-none top-[100%]"
              }`}
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
              {isError && <p className="text-red-500 text-sm mt-1">{error?.message}</p>}
            </div>
          </div>
        </li>
        <li>
          <Button
            text="Minha Lista"
            className="bg-[#010C19] text-gray-500 text- px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
            onClick={() => handleActionNavigation("userlist")}
          />
        </li>
      </ul>
    </div>
  );
}
