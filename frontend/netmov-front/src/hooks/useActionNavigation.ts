import { useNavigate } from "react-router-dom";

export const useActionNavigation = () => {
  const navigate = useNavigate();

  const handleActionNavigation = (action: string) => {
    const routes: { [key: string]: string } = {
      login: "/login",
      userlist: "/",
      start: "/",
      register: "/register",
      home: "/",
    };

    const route = routes[action];
    if (route) {
      navigate(route);
    } else {
      console.warn(`Rota para a ação "${action}" não foi definida.`);
    }
  };

  return { handleActionNavigation };
};
