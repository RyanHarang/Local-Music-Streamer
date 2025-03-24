import { useEffect, useState } from "react";
import MoonIcon from "../../../assets/svg/mode/MoonIcon.jsx";
import SunIcon from "../../../assets/svg/mode/SunIcon.jsx";

const ModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={toggleMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="cursor-pointer rounded-lg border p-1"
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ModeToggle;
