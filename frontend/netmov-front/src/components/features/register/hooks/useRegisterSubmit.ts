import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../api/useRegisterUser";
import { RegisterFormInputs } from "../../../../validations/registerSchema";

export const useRegisterSubmit = () => {
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
        console.error("Erro ao registrar usuário", err.message);
      },
    });
  };

  return { onSubmit, successMessage, isPending, isError, error };
};
