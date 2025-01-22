import { OrangeButton } from "../buttons/OrangeButton";
import { TypingEffect } from "./Hooks/TypingEffect";
import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();

  function onClick() {
    navigate("/login");
  }

  return (
    <div className="bg-darkGradient w-screen h-screen flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center">
        <TypingEffect />
        <div className="mt-6">
          <OrangeButton onClick={onClick} text="Começar" />
        </div>
      </div>
    </div>
  );
}
