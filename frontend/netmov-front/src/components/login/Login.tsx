import { useNavigate } from "react-router-dom";
import { OrangeButton } from "../buttons/OrangeButton";
import { Input } from "../form/Input";
import { useLoginUser } from "./hooks/useLoginUser";
import { useState } from "react";

export function Login() {
  const { login, isLoading, error } = useLoginUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function onClick(action: string) {
    if (action === "register") {
      navigate("/register");
    } else if (action === "home") {
      navigate("/");
    }
  }

  const handleSubmit = () => {
    login({ email, password });
  };

  return (
    <>
      <div className="bg-darkBlue w-screen h-screen flex items-center justify-center flex-col">
        <h1 className="text-white text-4xl mb-4">...</h1>
        <div className="flex flex-col">
          <Input text="E-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

          <Input text="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <OrangeButton text={isLoading ? "Entrando..." : "Entrar"} onClick={handleSubmit} disabled={isLoading} />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="flex gap-5">
            <OrangeButton text="Voltar" onClick={() => onClick("home")} />
            <OrangeButton text="Criar conta" onClick={() => onClick("register")} />
          </div>
        </div>
      </div>
    </>
  );
}
