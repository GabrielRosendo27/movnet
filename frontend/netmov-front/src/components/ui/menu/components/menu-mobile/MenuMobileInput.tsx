import { Button } from "../../../buttons/Button";
import { Input } from "../../../form/Input";
import { MenuMobileInputProps } from "../../types/types";

export function MenuMobileInput({
  inputElementRef,
  setMovieName,
  movieName,
  validationError,
  isError,
  error,
  isPending,
  handleAddMovieWithValidation,
  inputRef,
  showInput,
}: MenuMobileInputProps) {
  return (
    <div className=" absolute top-[180px] left-[3px] mt-2 transition-all duration-500 ease-in-out border border-slate-900 rounded-lg" ref={inputRef}>
      <div
        className={`bg-myGray h-[220px] p-4 rounded-md shadow-md max-md:w-[350px] flex-1 transition-all duration-300 flex items-center justify-center ${
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
  );
}
