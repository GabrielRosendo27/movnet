import { HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  text: string;
}

export function Input(props: InputProps) {
  return (
    <>
      <label className="text-white">{props.text}</label>
      <input />
    </>
  );
}
