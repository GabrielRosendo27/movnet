import { useState, useEffect } from "react";

export function TypingEffect() {
  const fullText = "Gerrencie listas com seus filmes preferidos!";
  const [text, setText] = useState(fullText.charAt(0));

  useEffect(() => {
    let index = 1;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [fullText]);

  return <div className="text-white text-4xl">{text}</div>;
}
