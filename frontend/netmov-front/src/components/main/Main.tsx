import { useEffect } from "react";
import { useFetchUserName } from "../login/hooks/useFetchUserName";

export function Main() {
  const { fetchUserName, isLoading, error, userName } = useFetchUserName();

  useEffect(() => {
    fetchUserName();
  }, [fetchUserName]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }
  if (error) {
    return <p>Erro ao carregar Usuário. {error.message}</p>;
  }

  return <div>Bem vindo, {userName}</div>;
}
