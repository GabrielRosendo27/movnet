interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function OrangeButton({ text, onClick, type = "button", disabled }: ButtonProps): React.ReactElement {
  return (
    <button
      className="bg-myOrange text-xl text-white px-3 py-1 rounded-lg shadow-md transition-transform transform hover:bg-orange-600 hover:scale-105 mt-3"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
