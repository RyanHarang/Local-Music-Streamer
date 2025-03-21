const Navigation = ({ onNavChange }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2">
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
      </div>
    </nav>
  );
};

export default Navigation;
