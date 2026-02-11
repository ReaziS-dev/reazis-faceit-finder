"use client";
import "tailwindcss";
import { useTheme } from "./ThemeContext";

export default function Displayer2() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center p-5 rounded-2xl">
      Context Data: {theme}
    </div>
  );
}
