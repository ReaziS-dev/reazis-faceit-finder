"use client";
import { useTheme } from "./ThemeContext";

export default function Button() {
  const { theme, setTheme } = useTheme();

  const buttonClickHandler = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <button
      onClick={buttonClickHandler}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Click Me
    </button>
  );
}
