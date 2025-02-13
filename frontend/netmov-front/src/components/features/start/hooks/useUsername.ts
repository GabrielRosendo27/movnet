import { useEffect } from "react";
import { useFetchUserName } from "./useFetchUsername";

export function useUsername() {
  const { fetchUserName, isPending, error, userName } = useFetchUserName();

  useEffect(() => {
    fetchUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading: isPending, usernameError: error, userName };
}
