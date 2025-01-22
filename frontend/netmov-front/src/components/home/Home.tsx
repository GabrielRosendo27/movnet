import { Button } from "../buttons/Button";
import { Menu } from "../menu/Menu";
import { TypingEffect } from "./Hooks/TypingEffect";
import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();

  function onClick() {
    navigate("/login");
  }

  return (
    <div className="overflow-hidden w-screen h-screen bg-darkGradient ">
      <div>
        <Menu />
      </div>
      <div className="relative flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center mb-12">
          <TypingEffect />
          <div className="absolute bottom-64">
            <Button onClick={onClick} text="Começar" />
          </div>
        </div>
      </div>
    </div>
  );
}
