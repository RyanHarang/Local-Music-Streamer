import ModeToggle from "./Customization/ModeToggle.jsx";

const Navigation = ({ onNavChange, currentPage }) => {
  const linkClasses = (page) =>
    `relative transition-colors ${
      currentPage === page
        ? "text-blue-600 dark:text-blue-400 underline"
        : "hover:underline"
    }`;

  return (
    <nav className="flex w-full items-center justify-between border-b p-4">
      <div className="flex w-1/4 items-center">
        <h1 className="text-lg font-bold">Local Music Streamer</h1>
      </div>
      <div className="flex items-center gap-12">
        <button
          onClick={() => onNavChange("home")}
          className={linkClasses("home")}
        >
          Home
        </button>
        <button
          onClick={() => onNavChange("library")}
          className={linkClasses("library")}
        >
          Library
        </button>
        <button
          onClick={() => onNavChange("settings")}
          className={linkClasses("settings")}
        >
          Settings
        </button>
      </div>
      <div className="flex w-1/4 items-center justify-end gap-4">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navigation;
