import { useNavigate } from "react-router-dom";
import { OrangeButton } from "../buttons/OrangeButton";
import { Input } from "../form/Input";

export function Login() {
  const navigate = useNavigate();
  function onClick(action: string) {
    if (action === "register") {
      navigate("/register");
    } else if (action === "home") {
      navigate("/");
    }
  }

  return (
    <>
      <div className="bg-darkBlue w-screen h-screen flex items-center justify-center flex-col">
        <h1 className="text-white text-4xl mb-4">...</h1>
        <div className="flex flex-col">
          <Input text="E-mail" />
          <Input text="Senha" />
          <OrangeButton text="Entrar" />
          <div className="flex gap-5">
            <OrangeButton text="Voltar" onClick={() => onClick("home")} />
            <OrangeButton text="Criar conta" onClick={() => onClick("register")} />
          </div>
        </div>
      </div>
    </>
  );
}
