import { ReactNode } from "react";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export function Button({ text, onClick, type = "button", disabled, className = "" }: ButtonProps): React.ReactElement {
  return (
    <button className={` rounded-md shadow-md transition-colors duration-500 mt-3 ${className}`} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
}
