import { AuthenticatedMenu } from "../../ui/menu";

export function Start() {
  return (
    <>
      <div className="bg-darkGradient w-screen h-screen text-white flex items-center justify-center">
        <AuthenticatedMenu />
      </div>
    </>
  );
}
