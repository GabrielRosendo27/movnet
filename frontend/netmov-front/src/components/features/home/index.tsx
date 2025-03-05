import { useActionNavigation } from "../../../hooks/useActionNavigation";
import { Button } from "../../ui/buttons/Button";
import { Menu } from "../../ui/menu/components/Menu";
import { TypingEffect } from "./hooks/TypingEffect";
export function Home() {
  const { handleActionNavigation } = useActionNavigation();

  return (
    <div className="overflow-hidden w-screen h-screen bg-darkGradient z-10 relative">
      <div>
        <Menu />
      </div>
      <div className="bg-[url('7.jfif')] bg-cover bg-center bg-no-repeat -z-10 absolute w-full h-full opacity-5"></div>
      <div className=" flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center mb-12">
          <TypingEffect />
          <div className="mt-4 ">
            <Button
              onClick={() => handleActionNavigation("register")}
              text="Começar"
              className="bg-myPurple text-xl text-white px-8 py-4 hover:bg-indigo-800 mt-3 animate-fadeSlideDown"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
