import { useActionNavigation } from "../../../hooks/useActionNavigation";
import { Button } from "../../ui/buttons/Button";
import { Menu } from "../../ui/menu/components/Menu";

export function Index() {
  const { handleActionNavigation } = useActionNavigation();
  return (
    <>
      <div className="overflow-x-hidden w-screen h-screen bg-myGray z-10 ">
        <div>
          <Menu />
        </div>
        <div className="mt-36 text-xl p-4 flex flex-col text-gray-200 max-sm:text-base max-sm:ml-2 leading-relaxed tracking-wide w-full items-center justify-center  ml-6 mr-6">
          <div className="flex flex-col items-center justify-center p-4">
            <h4 className="text-left max-w-2xl self-start">
              Nossa plataforma foi criada especialmente para você que ama cinema e quer organizar sua lista de filmes de forma prática e divertida. <br />
              Aqui, você poderá acompanhar os filmes que já assistiu, adicionar novos títulos à sua lista e gerenciar toda a sua experiência cinematográfica com
              facilidade.
            </h4>
            <div className="border-b border-slate-800 w-full mb-6 mt-4"></div>
            <ul className="list-decimal space-y-2 text-lg">
              <li className="text-myOrange">
                <span className="text-gray-300">Crie uma conta usando seu usuário, e-mail e senha.</span>
              </li>
              <li className="text-myOrange">
                <span className="text-gray-300">Faça Login para acessar seu painel personalizado.</span>
              </li>
              <li className="text-myOrange">
                <span className="text-gray-300">Clique em "Adicionar Filme" e insira o título desejado para incluir em sua lista.</span>
              </li>
              <li className="text-myOrange">
                <span className="text-gray-300">Visualize sua lista completa e veja quantos filmes você já adicionou.</span>
              </li>
              <li className="text-myOrange">
                <span className="text-gray-300">Marque os filmes que você já assistiu e acompanhe seu progresso ao longo do tempo.</span>
              </li>
              <li className="text-myOrange">
                <span className="text-gray-300">
                  Explore funcionalidades extras: organize os títulos por categorias, adicione notas e compartilhe sua coleção com amigos!
                </span>
              </li>
            </ul>
            <Button onClick={() => handleActionNavigation("register")} text="Criar Conta" className="bg-myPurple text-white px-4 py-2 hover:bg-indigo-800 mt-6" />
          </div>
        </div>
      </div>
    </>
  );
}
