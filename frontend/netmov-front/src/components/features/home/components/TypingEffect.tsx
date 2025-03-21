import { useState, useEffect } from "react";
import { Segment } from "../types/types";

export function TypingEffect() {
  const textObj = {
    segments: [
      { text: "Descubra", style: "text-myOrange text-6xl" },
      { text: "Organize", style: "text-myPurple text-6xl  mt-2 " },
      { text: "Acompanhe", style: "text-white text-6xl mt-2" },
      { text: "Listas com seus filmes favoritos!", style: "text-gray-400 text-2xl mt-2" },
    ],
  };
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [visibleText, setVisibleText] = useState<Segment[]>(
    textObj.segments.map((segment) => ({
      ...segment,
      visibleText: "",
    }))
  );
  useEffect(() => {
    const currentSegment = visibleText[currentSegmentIndex];

    if (!currentSegment) return;

    const segmentText = currentSegment.text;

    const interval = setInterval(() => {
      setVisibleText((prev) =>
        prev.map((segment, index) =>
          index === currentSegmentIndex
            ? {
                ...segment,
                visibleText: segment.visibleText + segmentText[segment.visibleText.length],
              }
            : segment
        )
      );

      if (currentSegment.visibleText.length + 1 === segmentText.length) {
        clearInterval(interval);
        setCurrentSegmentIndex((prev) => prev + 1);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentSegmentIndex, visibleText]);

  return (
    <div className="flex flex-col mb-4">
      {visibleText.map((segment, i) => (
        <div key={i} className={`${segment.style} max-sm:text-2xl`}>
          {segment.visibleText}
        </div>
      ))}
    </div>
  );
}
