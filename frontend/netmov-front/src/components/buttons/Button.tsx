interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export function Button({ text, onClick, type = "button", disabled, className = "" }: ButtonProps): React.ReactElement {
  return (
    <button
      className={`bg-myPurple text-xl text-white px-8 py-4 rounded-md shadow-md transition-colors duration-500 hover:bg-indigo-800 mt-3 ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
