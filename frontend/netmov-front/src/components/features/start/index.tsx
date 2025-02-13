import { AuthenticatedMenu } from "../../ui/menu";
import { useUsername } from "./hooks/useUsername";

export function Start() {
  const { isPending, error, userName } = useUsername();
  return (
    <>
      <div className="bg-darkGradient w-screen h-screen text-white flex items-center justify-center">
        <AuthenticatedMenu />
        <div>{isPending && <p>carregando...</p>}</div>
        <div>{error && <p>{error.message}</p>}</div>
        <div>usuário: {userName}</div>
      </div>
    </>
  );
}
