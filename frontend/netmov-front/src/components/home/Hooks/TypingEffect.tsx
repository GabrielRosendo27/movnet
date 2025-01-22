import { useState, useEffect } from "react";

interface Segment {
  text: string;
  style: string;
  visibleText: string;
}

export function TypingEffect() {
  const textObj = {
    fullString: "Descubra, organize e acompanhe seus filmes favoritos",
    segments: [
      { text: "Descubra", style: "text-myOrange text-5xl" },
      { text: "Organize", style: "text-myPurple text-5xl  mt-2" },
      { text: "Acompanhe", style: "text-white text-5xl mt-2" },
      { text: "Listas com seus filmes favoritos!", style: "text-gray-400 text-2xl mt-2" },
    ],
  };
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0); // Índice do segmento atual
  const [visibleText, setVisibleText] = useState<Segment[]>(
    textObj.segments.map((segment) => ({
      ...segment,
      visibleText: "", // Inicialmente vazio
    }))
  );
  useEffect(() => {
    const currentSegment = visibleText[currentSegmentIndex];

    if (!currentSegment) return; // Fim da animação

    const segmentText = currentSegment.text;

    // Animação letra por letra dentro do segmento atual
    const interval = setInterval(() => {
      setVisibleText((prev) =>
        prev.map((segment, index) =>
          index === currentSegmentIndex
            ? {
                ...segment,
                visibleText: segment.visibleText + segmentText[segment.visibleText.length], // Adiciona a próxima letra
              }
            : segment
        )
      );

      // Move para o próximo segmento quando o texto atual estiver completamente visível
      if (currentSegment.visibleText.length + 1 === segmentText.length) {
        clearInterval(interval);
        setCurrentSegmentIndex((prev) => prev + 1); // Avança para o próximo segmento
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentSegmentIndex, visibleText]);

  return (
    <div className="flex flex-col ml-auto mr-auto">
      {visibleText.map((segment, i) => (
        <div key={i} className={segment.style}>
          {segment.visibleText}
        </div>
      ))}
    </div>
  );
}
