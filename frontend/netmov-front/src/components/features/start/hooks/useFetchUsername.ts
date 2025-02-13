import { useProtectedRequest } from "../../../../hooks/useProtectedRequest";

export function useFetchUserName() {
  const { data, isPending, error, refetch } = useProtectedRequest<{ userName: string }>();

  const fetchUserName = () => {
    refetch();
  };
  return {
    isPending,
    userName: data?.userName,
    error,
    fetchUserName,
  };
}
