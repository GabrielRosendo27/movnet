import { useProtectedRequest } from "../../../../hooks/useProtectedRequest";

export function useFetchUserName() {
  const query = useProtectedRequest<{ userName: string }>("User/start");

  return {
    fetchUserName: query.mutate,
    isLoading: query.isPending,
    error: query.error,
    userName: query.data?.userName,
  };
}
