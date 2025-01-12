interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

export function OrangeButton({ text, onClick }: ButtonProps): React.ReactElement {
  return (
    <button
      className="bg-myOrange text-xl text-white px-3 py-1 rounded-lg shadow-md transition-transform transform hover:bg-orange-600 hover:scale-105 mt-3"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
