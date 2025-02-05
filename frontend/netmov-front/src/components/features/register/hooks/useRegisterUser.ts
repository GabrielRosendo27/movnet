import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { RegisterUserPayload, RegisterResponse } from "../types/types";
import { registerUser } from "../api/registerUser";

export const useRegisterUser = (): UseMutationResult<RegisterResponse, Error, RegisterUserPayload> => {
  return useMutation<RegisterResponse, Error, RegisterUserPayload>({ mutationFn: registerUser });
};
