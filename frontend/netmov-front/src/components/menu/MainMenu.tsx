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

  // function handleAddMovie() {
  //   setShowInput(true);
  //   if (showInput === true) {
  //     setShowInput(false);
  //   }
  // }
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
            <Button text="+ Adicionar Filme" className="px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800" onClick={() => setShowInput(!showInput)} />

            <div
              className={`absolute left-[-50%] top-[110%] transition-all duration-500 ease-in-out  ${
                showInput ? "opacity-100 pointer-events-auto z-0" : "opacity-0 pointer-events-none top-[94%]"
              }`}
            >
              <div className="flex items-center justify-center ">
                <Input text="" type="text" className={`rounded-sm bg-transparent`} />
                <Button text="Adicionar" className="px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800 mb-5 ml-4" />
              </div>
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
