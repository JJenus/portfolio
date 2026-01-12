import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
  cursorClassName?: string;
  loop?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  delay = 50,
  className = "",
  cursorClassName = "",
  loop = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  useEffect(() => {
    const texts = [
      "Initializing robust backend solutions...",
      "Building scalable microservices...",
      "Architecting high-availability systems...",
      "Optimizing real-time data pipelines...",
    ];

    const handleTyping = () => {
      if (!loop) {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          setIndex((prev) => prev + 1);
        }
        return;
      }

      if (!isDeleting && index < currentText.length) {
        setDisplayedText((prev) => prev + currentText.charAt(index));
        setIndex((prev) => prev + 1);
      } else if (isDeleting && index > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      } else if (!isDeleting && index === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
        const nextText = texts[(texts.indexOf(currentText) + 1) % texts.length];
        setCurrentText(nextText);
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? delay / 2 : delay);
    return () => clearTimeout(timeout);
  }, [index, isDeleting, delay, currentText, text, loop]);

  return (
    <span className={cn("font-mono text-cyan-400", className)}>
      {displayedText}
      <span className={cn("animate-pulse ml-0.5", cursorClassName)}>|</span>
    </span>
  );
};

export default Typewriter;
