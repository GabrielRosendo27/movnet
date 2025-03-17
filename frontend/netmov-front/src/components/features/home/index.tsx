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
      <div
        className="grid mt-32 p-4 mx-auto 
               grid-cols-[minmax(0,1fr)_550px] 
               w-full max-w-[calc(100vw-32px)] max-lg:grid-cols-1 max-lg:mt-64"
      >
        <div className="flex flex-col items-center justify-center">
          <TypingEffect />
          <Button
            onClick={() => handleActionNavigation("register")}
            text="Começar"
            className="bg-myPurple text-xl text-white px-8 py-4 hover:bg-indigo-800 mt-3 animate-fadeSlideDown"
          />
        </div>
        <div className="place-items-end mr-20 max-lg:hidden">
          <img src="111.png" alt="a" className="rounded-xl border border-slate-800 w-[550px] object-cover " />
        </div>
      </div>
    </div>
  );
}
