import { useEffect, useState, useRef } from "react";

const highlightColors = {
  "Highlight 1": "--color-highlight-1",
  "Highlight 2": "--color-highlight-2",
  "Highlight 3": "--color-highlight-3",
  "Highlight 4": "--color-highlight-4",
};

const ThemeToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("--color-highlight-1");

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleSelect = (color) => {
    setSelected(color);
    document.documentElement.style.setProperty(
      "--color-accent",
      `var(${color})`,
    );
    localStorage.setItem("accentColor", color);
  };

  useEffect(() => {
    const storedColor = localStorage.getItem("accentColor");

    if (storedColor && Object.values(highlightColors).includes(storedColor)) {
      setSelected(storedColor);
      document.documentElement.style.setProperty(
        "--color-accent",
        `var(${storedColor})`,
      );
    } else {
      document.documentElement.style.setProperty(
        "--color-accent",
        `var(${selected})`,
      );
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="group relative flex items-center"
      onMouseLeave={() => setMenuOpen(false)}
    >
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="border-accent bg-accent h-6 w-6 cursor-pointer rounded-lg border-2"
      ></button>
      {menuOpen && (
        <div
          ref={menuRef}
          className="bg-light-bg2 dark:bg-dark-bg2 absolute left-1/2 mt-40 w-12 -translate-x-1/2 rounded-lg shadow-lg"
        >
          <div className="flex flex-col items-center justify-center gap-2 p-2">
            {Object.entries(highlightColors).map(([label, color]) => (
              <button
                key={color}
                onClick={() => handleSelect(color)}
                className={`h-6 w-6 cursor-pointer rounded-lg border-2 ${
                  selected === color ? "ring-accent ring-2" : ""
                }`}
                style={{ backgroundColor: `var(${color})` }}
                title={label}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
