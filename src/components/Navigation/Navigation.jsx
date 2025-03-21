const Navigation = ({ onNavChange }) => {
  return (
    <nav className="flex w-full items-center justify-between p-4">
      <h1 className="text-lg font-bold">Local Music Streamer</h1>
      <div className="flex gap-4">
        <button onClick={() => onNavChange("home")} className="hover:underline">
          Home
        </button>
        <button
          onClick={() => onNavChange("library")}
          className="hover:underline"
        >
          Library
        </button>
        <button
          onClick={() => onNavChange("settings")}
          className="hover:underline"
        >
          Settings
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
