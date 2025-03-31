import { useActionNavigation } from "../../../hooks/useActionNavigation";
import { Button } from "../../ui/buttons/Button";
import { AuthenticatedMenu } from "../../ui/menu";
import { UserDetails } from "./components/UserDetails";

export function Start() {
  const { handleActionNavigation } = useActionNavigation();
  return (
    <>
      <div className="bg-myGray w-screen h-screen overflow-x-hidden flex items-start justify-center">
        <div className="flex flex-col gap-10 max-md:mx-6">
          <AuthenticatedMenu />
          <UserDetails />

          <div className="text-white border border-slate-900 p-6">
            <span className="text-4xl max-md:text-2xl">Últimos Adicionados</span>
            <ul className="mt-4">
              <li>1. Em Desenvolvimento...</li>
              <li>2. </li>
              <li>3. </li>
              <li>4. </li>
              <li>5. </li>
            </ul>
          </div>
          <div className="text-white border border-slate-900 p-6 flex flex-col ">
            <span className="text-2xl max-md:text-md">Quer Conferir sua lista?</span>
            <span>
              Confira em <Button text="Minha Lista" className="ml-2 bg-slate-900 py-2 px-4 hover:bg-slate-800" onClick={() => handleActionNavigation("/userlist")} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
