import { Button } from "../../buttons/Button";
import { useActionNavigation } from "../../../../hooks/useActionNavigation";

export function Menu() {
  const { handleActionNavigation } = useActionNavigation();
  return (
    <div className="p-4 bg-[#010C19] fixed top-0 left-0 w-full z-10">
      <ul className="flex gap-4 justify-between mx-12 items-center">
        <li>
          <Button
            text="Movnet"
            className="bg-[#010C19] text-gray-500 text- px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
            onClick={() => handleActionNavigation("home")}
          />
        </li>
        <li>
          <Button
            text="Como Funciona"
            className="bg-[#010C19] text-gray-500 text-md px-4 py-2 rounded-md shadow-md transition-colors duration-500 hover:bg-[#010C19] hover:text-gray-400"
          />
        </li>
        <div className="flex gap-5">
          <li>
            <Button text="Entrar" className="px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800" onClick={() => handleActionNavigation("login")} />
          </li>
          <li>
            <Button text="Cadastrar-se" className="px-4 py-2 text-sm bg-myPurple text-white hover:bg-indigo-800" onClick={() => handleActionNavigation("register")} />
          </li>
        </div>
      </ul>
    </div>
  );
}
