"use client";
import "tailwindcss";
import { useTheme } from "./ThemeContext";

export default function Displayer1() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center p-7 rounded-2xl">
      Context Data: {theme}
    </div>
  );
}
