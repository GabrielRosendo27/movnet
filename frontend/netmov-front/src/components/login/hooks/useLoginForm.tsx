import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormInputs } from "../../validations/loginSchema";

export function useLoginForm(onSubmit: (data: LoginFormInputs) => void) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  return { register, handleSubmit, errors, onSubmit };
}
