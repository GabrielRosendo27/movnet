import { useNavigate } from "react-router-dom";
import { Button } from "../buttons/Button";
import { useState } from "react";
import { Input } from "../form/Input";

export function MainMenu() {
  const navigate = useNavigate();

  function onClick(route: string) {
    navigate(route);
  }

  const [showInput, setShowInput] = useState(false);

  function handleAddMovie() {
    setShowInput(true);
    if (showInput === true) {
      setShowInput(false);
    }
  }
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
          <div className="relative">
            <Button text="+ Adicionar Filme" className="px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800" onClick={handleAddMovie} />
          </div>
          {showInput ? (
            <div className="flex items-center justify-center absolute right-[400px] bottom-[-50px] transition transition-duration-300">
              <Input text="Filme" type="text" />
              <Button text="Enviar" className="px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800 mb-5 ml-4" />
            </div>
          ) : (
            ""
          )}
          {/* <div className="absolute right-[400px] bottom-[-40px]">
            <Input text="Filme" type="text" />
          </div> */}
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
