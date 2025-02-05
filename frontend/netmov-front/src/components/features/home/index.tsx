import { Button } from "../../ui/buttons/Button";
import { Menu } from "../../ui/menu/components/Menu";
import { TypingEffect } from "./hooks/TypingEffect";
import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();

  function onClick() {
    navigate("/register");
  }

  return (
    <div className="overflow-hidden w-screen h-screen bg-darkGradient ">
      <div>
        <Menu />
      </div>
      <div className=" flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center mb-12">
          <TypingEffect />
          <div className="mt-4 ">
            <Button onClick={onClick} text="Começar" className="bg-myPurple text-xl text-white px-8 py-4 hover:bg-indigo-800 mt-3 animate-fadeSlideDown" />
          </div>
        </div>
      </div>
    </div>
  );
}
