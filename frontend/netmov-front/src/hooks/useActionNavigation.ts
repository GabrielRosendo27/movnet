import { useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const useActionNavigation = () => {
  const navigate = useNavigate();

  const handleActionNavigation = (action: string) => {
    const routes: { [key: string]: string } = {
      login: "/login",
      userlist: "/userlist",
      start: "/",
      register: "/register",
      home: "/",
      howitworks: "/how-it-works",
    };

    const route = routes[action] || action;
    if (route) {
      NProgress.start();
      const delay = Math.floor(Math.random() * (900 - 300 + 1)) + 300;
      setTimeout(() => {
        navigate(route);
        NProgress.done();
      }, delay);
    } else {
      console.warn(`Rota para a ação "${action}" não foi definida.`);
    }
  };

  return { handleActionNavigation };
};
