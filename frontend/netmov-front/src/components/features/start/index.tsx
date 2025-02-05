import { StartMenu } from "../../ui/menu/components/StartMenu";
import { useUsername } from "./hooks/useUsername";

export function Main() {
  const { isLoading, error, userName } = useUsername();

  return (
    <>
      <div className="bg-darkGradient w-screen h-screen text-white flex items-center justify-center">
        <StartMenu />
        <div>{isLoading && <p>carregando...</p>}</div>
        <div>{error && <p>{error.message}</p>}</div>
        <div>usuário: {userName}</div>
      </div>
    </>
  );
}
