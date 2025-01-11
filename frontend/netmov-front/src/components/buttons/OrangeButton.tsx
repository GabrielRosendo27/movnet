interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function OrangeButton(props: ButtonProps): React.ReactElement {
  return (
    <button
      className="bg-myOrange text-5xl text-white p-3 rounded-md shadow-md transition-transform transform hover:bg-orange-600 hover:scale-105"
      onClick={props.onClick}
    >
      Começar
    </button>
  );
}
