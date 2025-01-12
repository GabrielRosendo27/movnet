import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  type: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, text, ...props }, ref) => {
  return (
    <>
      <label htmlFor={text} className="text-white">
        {text}
      </label>
      <input id={text} ref={ref} type={type} {...props} />
    </>
  );
});
Input.displayName = "Input";
