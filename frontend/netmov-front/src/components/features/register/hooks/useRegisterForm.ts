import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterFormInputs } from "../../../../validations/registerSchema";

export function useRegisterForm(onSubmit: (data: RegisterFormInputs) => void) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterSchema),
  });

  return { register, handleSubmit, errors, onSubmit };
}
