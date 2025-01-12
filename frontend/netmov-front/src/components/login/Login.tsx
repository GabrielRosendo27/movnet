import { useNavigate } from "react-router-dom";
import { OrangeButton } from "../buttons/OrangeButton";
import { Input } from "./form/Input";

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
        <OrangeButton text="Voltar" onClick={() => onClick("home")} />

        <h1 className="text-white text-4xl mb-4">...</h1>
        <Input text="Email:" />
        <Input text="Senha:" />
        <OrangeButton text="Entrar" />
        <OrangeButton text="Criar conta" onClick={() => onClick("register")} />
      </div>
    </>
  );
}
