import { Input } from "../../ui/form/Input";
import { Button } from "../../ui/buttons/Button";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { Menu } from "../../ui/menu/components/Menu";
import { Spinner } from "../../../assets/Spinner";
import { useRegisterSubmit } from "./hooks/useRegisterSubmit";

export function Register() {
  const { onSubmit, successMessage, isPending, isError, error } = useRegisterSubmit();
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
          <div className="flex flex-col">
            {isError && <span className="text-red-600 text-md">Falha na requisição - {error?.message}</span>}
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

          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
      </form>
      <div />
    </div>
  );
}
