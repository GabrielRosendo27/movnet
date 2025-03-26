import { AuthenticatedMenu } from "../../ui/menu";
import { UserDetails } from "./components/UserDetails";

export function Start() {
  return (
    <>
      <div className="bg-myGray w-screen h-screen overflow-x-hidden">
        <AuthenticatedMenu />
        <UserDetails />
      </div>
    </>
  );
}
