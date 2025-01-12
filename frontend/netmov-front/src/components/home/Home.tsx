import { OrangeButton } from "../buttons/OrangeButton";
import { TypingEffect } from "./Hooks/TypingEffect";
import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();

  function onClick() {
    navigate("/login");
  }

  return (
    <div className="bg-darkBlue w-screen h-screen flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center">
        <h1 className="text-8xl text-white mb-2">Movnet</h1>
        <TypingEffect />
        <div className="mt-6">
          <OrangeButton onClick={onClick} text="Começar" />
        </div>
      </div>
    </div>
  );
}
