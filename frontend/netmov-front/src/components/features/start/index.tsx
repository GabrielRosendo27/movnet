import { AuthenticatedMenu } from "../../ui/menu";
import { UserList } from "./components/UserList";

export function Start() {
  return (
    <>
      <div className="bg-darkGradient w-screen h-screen text-white flex items-center justify-center">
        <AuthenticatedMenu />
        <UserList />
      </div>
    </>
  );
}
