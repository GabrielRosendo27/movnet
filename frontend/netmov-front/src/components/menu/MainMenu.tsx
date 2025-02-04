import { useNavigate } from "react-router-dom";
import { Button } from "../ui/buttons/Button";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/form/Input";
import { useAddMovie } from "../main/user-list/hooks/useAddMovie";

// import { Spinner } from "../../assets/Spinner";

export function MainMenu() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useAddMovie();
  const [showInput, setShowInput] = useState(false);
  const [movieName, setMovieName] = useState("");

  function onClick(route: string) {
    navigate(route);
  }

  const inputRef = useRef<HTMLDivElement>(null);
  const inputElementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showInput && inputElementRef.current) {
      inputElementRef.current.focus();
    }
  }, [showInput]);

  const handleAddMovie = () => {
    if (movieName.trim() === "") {
      alert("Por favor, digite o nome do filme.");
      return;
    }

    mutate(
      { title: movieName },
      {
        onSuccess: () => {
          alert("Filme adicionado com sucesso!");
          setMovieName("");
          setShowInput(false);
        },
        onError: (error) => {
          alert(error.message || "Erro ao adicionar filme");
        },
      }
    );
  };

  return (
    <div className="p-4 bg-[#010C19] fixed top-0 left-0 w-full z-10">
      <ul className="flex gap-4 justify-between mx-12 items-center">
        <li>
          <Button
            text="Movnet"
            className="bg-[#010C19] text-gray-500 text- px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
            onClick={() => onClick("/main")}
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
                  onClick={handleAddMovie}
                  disabled={isPending}
                />
              </div>
              {isError && <p className="text-red-500 text-sm mt-1">{error?.message}</p>}
            </div>
          </div>
        </li>
        <li>
          <Button
            text="Minha Lista"
            className="bg-[#010C19] text-gray-500 text- px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
            onClick={() => onClick("/userlist")}
          />
        </li>
      </ul>
    </div>
  );
}
