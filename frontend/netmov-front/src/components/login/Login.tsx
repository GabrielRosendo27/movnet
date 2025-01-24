import { useNavigate } from "react-router-dom";
import { Button } from "../buttons/Button";
import { Input } from "../form/Input";
import { useLoginUser } from "./hooks/useLoginUser";
import { useState } from "react";
import { Menu } from "../menu/Menu";

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
      <div className="bg-darkGradient w-screen h-screen flex items-center justify-center flex-col">
        <Menu />
        <h1 className="text-white text-4xl mb-4">...</h1>
        <div className="flex flex-col">
          <Input text="E-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

          <Input text="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button
            text={isLoading ? "Entrando..." : "Entrar"}
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-myPurple text-xl text-white px-8 py-4 hover:bg-indigo-800 mt-3"
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="flex gap-5">
            <Button text="Voltar" onClick={() => onClick("home")} className="bg-myPurple text-xl text-white px-8 py-4 hover:bg-indigo-800 mt-3" />
            <Button text="Criar conta" onClick={() => onClick("register")} className="bg-myPurple text-xl text-white px-8 py-4 hover:bg-indigo-800 mt-3" />
          </div>
        </div>
      </div>
    </>
  );
}
