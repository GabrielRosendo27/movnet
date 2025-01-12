import { Input } from "../form/Input";
import { OrangeButton } from "../buttons/OrangeButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterSchema = z.object({
  user: z.string().min(2, "O usuário deve ter pelo menos 2 caracteres."),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type RegisterFormInputs = z.infer<typeof RegisterSchema>;

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Usuário registrado:", data);
  };

  const navigate = useNavigate();
  function onClick() {
    navigate("/login");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-darkBlue w-screen h-screen flex items-center justify-center flex-col">
        <div className="flex flex-col gap-1">
          <Input text="Nome de usuário:" {...register("user")} type="text" />
          {errors.user && <span className="text-red-600">{errors.user.message}</span>}
          <Input text="Email:" {...register("email")} type="text" />
          {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          <Input text="Senha:" {...register("password")} type="password" />
          {errors.password && <span className="text-red-600">{errors.password.message}</span>}
        </div>
        <div className="flex gap-5">
          <OrangeButton text="Voltar" onClick={onClick} />
          <OrangeButton text="Criar Conta" type="submit" />
        </div>
      </div>
    </form>
  );
}
