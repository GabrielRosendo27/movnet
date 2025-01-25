import { useNavigate } from "react-router-dom";
import { Button } from "../buttons/Button";
import { Input } from "../form/Input";
import { useLoginUser } from "./hooks/useLoginUser";
// import { useState } from "react";
import { Menu } from "../menu/Menu";
import { Spinner } from "../../assets/Spinner";
import { useLoginForm } from "./hooks/useLoginForm";

export function Login() {
  const { login, isLoading, error } = useLoginUser();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();
  function onClick(action: string) {
    if (action === "register") {
      navigate("/register");
    } else if (action === "home") {
      navigate("/");
    }
  }

  const onSubmit = (data: { email: string; password: string }) => {
    login(data);
  };
  // const buttonSubmit = () => {
  //   login({ email, password });
  // };

  const { register, handleSubmit, errors } = useLoginForm(onSubmit);
  return (
    <>
      <div className="bg-darkGradient w-screen h-screen flex items-center justify-center flex-col">
        <Menu />
        <div className="mb-4">
          <p className="text-gray-400 mb-4">
            Preencha seus dados, caso não possua uma conta, <Button text="registre-se" onClick={() => onClick("register")} className=" text-myOrange" />
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col">
            <div className="mb-4">
              <Input text="E-mail" type="text" {...register("email")} classNameSpan="bottom-2" />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="mb-2">
              <Input text="Senha" type="password" {...register("password")} />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            <div className="flex items-center justify-center mb-2">{error && <p className="text-red-500 mt-2">Erro: {error}</p>}</div>
            <Button
              text={isLoading ? <Spinner /> : "Entrar"}
              disabled={isLoading}
              type="submit"
              className="bg-myPurple text-xl text-white px-8 py-4 hover:bg-indigo-800 mt-2 flex items-center justify-center"
            />
          </div>
        </form>
      </div>
    </>
  );
}
