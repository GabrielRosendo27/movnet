import { OrangeButton } from "../buttons/OrangeButton";
import { TypingEffect } from "./Hooks/TypingEffect";

export function Home() {
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Click");
  }

  return (
    <div className="bg-darkBlue w-screen h-screen flex items-center justify-center">
      <div className="container grid grid-cols-2">
        <TypingEffect />
        <OrangeButton onClick={onClick} />
      </div>
    </div>
  );
}
