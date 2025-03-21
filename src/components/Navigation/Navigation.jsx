import ModeToggle from "./Customization/ModeToggle.jsx";

const Navigation = ({ onNavChange }) => {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4">
      <div className="flex items-center">
        <h1 className="text-lg font-bold">Local Music Streamer</h1>
      </div>
      <div className="flex items-center gap-12">
        <button
          onClick={() => onNavChange("home")}
          className="hover:underline focus:outline-none"
        >
          Home
        </button>
        <button
          onClick={() => onNavChange("library")}
          className="hover:underline focus:outline-none"
        >
          Library
        </button>
        <button
          onClick={() => onNavChange("settings")}
          className="hover:underline focus:outline-none"
        >
          Settings
        </button>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navigation;
