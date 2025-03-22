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
      <div className="bg-myGray w-screen h-screen flex items-center justify-center flex-col">
        <Menu />
        <div className="mb-4">
          <p className="text-gray-400 text-xl mb-4 max-sm:mx-auto max-sm:p-4">
            Preencha seus dados, caso não possua uma conta, <Button text="registre-se ⤴" onClick={() => handleActionNavigation("register")} className=" text-myOrange" />
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

            <div className="flex items-center justify-center mb-2">{error && <p className="text-red-500 mt-2">{error}</p>}</div>
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
