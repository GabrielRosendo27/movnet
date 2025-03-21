import { useState } from "react";
import { Button } from "../../buttons/Button";
import { useActionNavigation } from "../../../../hooks/useActionNavigation";

export function Menu() {
  const { handleActionNavigation } = useActionNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="flex items-center bg-myGray fixed top-0 left-0 w-[99.2%] z-50 h-20 ">
      <div className="flex items-center ml-12">
        <div>
          <Button
            text="🎬 Movnet"
            className="text-myOrange text-3xl px-4 py-2 transition-transform duration-3000 hover:text-myPurple hover:scale-105"
            onClick={() => handleActionNavigation("home")}
          />
        </div>

        {/* Botão para mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
            {/* Ícone de hambúrguer */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu desktop */}
        <ul className="hidden md:flex ">
          <li className="ml-10">
            <Button
              text="Como Funciona"
              className="text-gray-400 text-lg px-4 py-2 transition-colors duration-500 hover:text-gray-300"
              onClick={() => handleActionNavigation("howitworks")}
            />
          </li>
          <li className="">
            <Button
              text="Entrar"
              className="text-gray-400 text-lg px-4 py-2 transition-colors duration-500 hover:text-gray-300"
              onClick={() => handleActionNavigation("login")}
            />
          </li>
          <li className="">
            <Button
              text="Cadastrar-se"
              className="text-gray-400 text-lg px-4 py-2 transition-colors duration-500 hover:text-gray-300"
              onClick={() => handleActionNavigation("register")}
            />
          </li>
        </ul>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 mx-4 items-center">
          <li>
            <Button
              text="Como Funciona"
              className=" bg-[#010C19] text-gray-500 text-md px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
              onClick={() => {
                handleActionNavigation("howitworks");
                setIsOpen(false);
              }}
            />
          </li>
          <li>
            <Button
              text="Entrar"
              className=" px-4 py-2 bg-myPurple text-white hover:bg-indigo-800"
              onClick={() => {
                handleActionNavigation("login");
                setIsOpen(false);
              }}
            />
          </li>
          <li>
            <Button
              text="Cadastrar-se"
              className=" px-4 py-2 bg-myPurple text-white hover:bg-indigo-800"
              onClick={() => {
                handleActionNavigation("register");
                setIsOpen(false);
              }}
            />
          </li>
        </ul>
      )}
    </div>
  );
}
