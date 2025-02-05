import { useEffect, useRef, useState } from "react";

export function useInputHandling() {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const inputElementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showInput && inputElementRef.current) {
      inputElementRef.current.focus();
    }
  }, [showInput]);

  return {
    showInput,
    setShowInput,
    inputRef,
    inputElementRef,
  };
}
