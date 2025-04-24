import { useState } from "react";

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-16 h-16 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute w-full h-full rounded-full border-4 border-fuchsia-800
        ${isHovered ? "animate-spin-slow" : "opacity-0"}`}
      ></div>
      <div className="absolute font-bold text-white text-xl">YPM</div>
    </div>
  );
}
