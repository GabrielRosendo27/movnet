import { useEffect } from "react";
import { useFetchUserName } from "./useFetchUsername";

export function useUsername() {
  const { fetchUserName, isLoading, error, userName } = useFetchUserName();
  useEffect(() => {
    fetchUserName();
  }, [fetchUserName]);

  return { fetchUserName, isLoading, error, userName };
}
