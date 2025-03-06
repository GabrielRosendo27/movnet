import { useActionNavigation } from "../../../hooks/useActionNavigation";
import { Button } from "../../ui/buttons/Button";
import { Menu } from "../../ui/menu/components/Menu";

export function Index() {
  const { handleActionNavigation } = useActionNavigation();
  return (
    <>
      <div className="overflow-hidden w-screen h-screen bg-darkGradient z-10">
        <div>
          <Menu />
        </div>
        <div className="mt-36 ml-16 text-xl p-2 flex flex-col items-start text-gray-200 max-sm:text-base max-sm:ml-2">
          <div>
            <span className="text-myOrange mr-2">1.</span>
            Crie uma conta com usuário, e-mail e senha.
          </div>
          <div>
            <span className="text-myOrange">2. </span>
            <span>Faça Login e Clique em "Adicionar Filme" e insira o título do filme que você deseja.</span>
          </div>
          <div>
            <span className="text-myOrange">3. </span>
            <span>O filme será adicionado à sua lista.</span>
          </div>
          <Button onClick={() => handleActionNavigation("register")} text="Criar Conta" className="bg-myPurple  text-white px-4 py-2 hover:bg-indigo-800 mt-4" />
        </div>
      </div>
    </>
  );
}
