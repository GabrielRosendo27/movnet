import { useActionNavigation } from "../../../hooks/useActionNavigation";
import { useAuth } from "../../../hooks/useAuthContext";
import { Button } from "../buttons/Button";
import { StartMenu } from "./components/StartMenu";

export function AuthenticatedMenu() {
  const { isAuthenticated } = useAuth();
  const { handleActionNavigation } = useActionNavigation();
  return (
    <div>
      {isAuthenticated ? (
        <div>
          {" "}
          <StartMenu />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center bg-darkGradient">
          <h2 className="text-gray-300 text-2xl">
            Faça <Button text="Login" className="text-myPurple" onClick={() => handleActionNavigation("login")} /> para continuar
            <br /> ou <Button text="Registre-se." className="text-myOrange" onClick={() => handleActionNavigation("register")} />
          </h2>
        </div>
      )}
    </div>
  );
}
