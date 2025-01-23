import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  type: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, text, ...props }, ref) => {
  return (
    <div className="relative flex">
      <input
        id={text}
        ref={ref}
        type={type}
        {...props}
        className="peer w-full bg-[#000811] outline-none border-b-2 border-gray-500 mb-8 text-white p-2 focus:outline-none cursor-pointer"
      />
      <label htmlFor={text} className="text-white text-lg absolute top-2 left-1 transition-all duration-300 cursor-pointer peer-focus:top-[-20px]">
        {text}
      </label>
      <span className="absolute bottom-8 left-0 h-[2px] w-0 bg-myPurple transition-all duration-300 ease-in-out peer-focus:w-full"></span>
    </div>
  );
});
Input.displayName = "Input";
