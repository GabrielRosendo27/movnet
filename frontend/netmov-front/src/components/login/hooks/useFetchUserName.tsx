import { useProtectedRequest } from "./useProtectedRequest";

export function useFetchUserName() {
  const query = useProtectedRequest<{ userName: string }>("User/main");

  return {
    fetchUserName: query.mutate,
    isLoading: query.isPending,
    error: query.error,
    userName: query.data?.userName,
  };
}
