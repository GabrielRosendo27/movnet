import { Input } from "../form/Input";
import { Button } from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import { RegisterFormInputs } from "../validations/registerSchema";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { useRegisterUser } from "./hooks/useRegisterUser";
import { Menu } from "../menu/Menu";
import { useState } from "react";
import { Spinner } from "../../assets/spinner";

export function Register() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useRegisterUser();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data: RegisterFormInputs) => {
    mutate(data, {
      onSuccess: (response) => {
        setSuccessMessage("Usuário registrado com sucesso!");
        console.log("Usuário registrado com sucesso:", response.message);
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 3000);
      },
      onError: (err) => {
        console.log("Erro ao registrar usuário", err.message);
      },
    });
  };
  const { register, handleSubmit, errors } = useRegisterForm(onSubmit);

  return (
    <div className="bg-darkGradient w-screen h-screen flex items-center justify-center flex-col">
      <Menu />
      <p className="text-gray-500 mb-6">Registre seu usuário, e-mail e senha</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center flex-col">
          <div className="flex flex-col gap-1 ">
            <Input text="Usuário" {...register("user")} type="text" />
            <div className="mb-4">{errors.user && <span className="text-red-600 text-sm">{errors.user.message}</span>}</div>
            <Input text="E-mail" {...register("email")} type="text" />
            <div className="mb-4">{errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}</div>

            <Input text="Senha" {...register("password")} type="password" />
            <div className="mb-4">{errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}</div>
          </div>
          <div className="flex gap-5">
            <Button
              text={
                isPending ? (
                  <div className="px-8 ">
                    <Spinner />
                  </div>
                ) : (
                  "Criar Conta"
                )
              }
              type="submit"
              className="bg-myPurple text-xl text-white px-8 py-4 hover:bg-indigo-800 mt-3"
            />
          </div>
          {isError && <span className="text-red-600 text-sm">Erro ao registrar: {error?.message}</span>}

          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
      </form>
      <div />
    </div>
  );
}
