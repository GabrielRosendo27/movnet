import { Button } from "../../ui/buttons/Button";
import { Input } from "../../ui/form/Input";
import { useLoginUser } from "./api/loginUser";
import { Menu } from "../../ui/menu/components/Menu";
import { Spinner } from "../../../assets/Spinner";
import { useLoginForm } from "./hooks/useLoginForm";
import { useActionNavigation } from "../../../hooks/useActionNavigation";

export function Login() {
  const { login, isLoading, error } = useLoginUser();
  const { handleActionNavigation } = useActionNavigation();

  const onSubmit = (data: { email: string; password: string }) => {
    login(data);
  };

  const { register, handleSubmit, errors } = useLoginForm(onSubmit);

  return (
    <>
      <div className="bg-myGray w-screen h-screen flex items-center justify-center gap-36 max-md:flex-col max-md:gap-2">
        <Menu />
        <div className="mb-4 p-4">
          <div className="border-t border-slate-700 mb-8 max-md:hidden"></div>
          <p className="text-gray-400 text-2xl mb-8 max-sm:mx-auto max-sm:p-4">
            Preencha seus dados
            <br />
            Caso não possua uma conta
            <br /> <Button text="Registre-se ⤴" onClick={() => handleActionNavigation("register")} className=" text-myOrange mb-2" />
          </p>
          <div className="border-b border-slate-700 max-md:hidden"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mr-10">
          <div className="flex flex-col">
            <div className="mb-4">
              <Input text="E-mail" type="text" {...register("email")} classNameSpan="bottom-2" />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="mb-2">
              <Input text="Senha" type="password" {...register("password")} />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            <div className="flex items-center justify-center mb-2">{error && <p className="text-red-500 mt-2">{error}</p>}</div>
            <div className="flex gap-5">
              <Button
                text={isLoading ? <Spinner /> : "Entrar"}
                disabled={isLoading}
                type="submit"
                className="bg-myPurple text-xl text-white px-6 py-4 hover:bg-indigo-800 mt-2 flex items-center justify-center"
              />
              <Button
                text={"Criar Conta"}
                disabled={isLoading}
                className="bg-myOrange text-xl text-white px-6 py-4 hover:bg-orange-800 mt-2 flex items-center justify-center"
                onClick={() => handleActionNavigation("register")}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
