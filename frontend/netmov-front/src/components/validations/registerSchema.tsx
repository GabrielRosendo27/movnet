import { z } from "zod";

export const RegisterSchema = z.object({
  user: z.string().min(2, "O usuário deve ter pelo menos 2 caracteres."),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type RegisterFormInputs = z.infer<typeof RegisterSchema>;
