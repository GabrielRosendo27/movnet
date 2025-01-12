import { Input } from "../login/form/Input";
import { OrangeButton } from "../buttons/OrangeButton";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  function onClick() {
    navigate("/login");
  }

  return (
    <div className="bg-darkBlue w-screen h-screen flex items-center justify-center flex-col text-white">
      <Input text="Email:" />
      <Input text="Nome de usuário:" />
      <Input text="Senha:" />
      <OrangeButton text="Entrar" />
      <OrangeButton text="Voltar" onClick={onClick} />
    </div>
  );
}
