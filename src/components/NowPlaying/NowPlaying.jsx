const NowPlaying = () => {
  return (
    <footer className="flex h-20 items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded">
          {/* Replace with album cover img */}
        </div>

        {/* Song details */}
        <div>
          <div className="text-sm font-semibold">Song Title</div>
          <div className="text-xs">Artist Name</div>
        </div>
      </div>

      {/* Playback controls (placeholder) */}
      <div className="flex items-center gap-4">
        <button>⏮️</button>
        <button className="text-xl">⏯️</button>
        <button>⏭️</button>
      </div>

      {/* Volume (optional) */}
      <div className="flex items-center gap-2">
        <span>🔊</span>
        <input type="range" min="0" max="100" className="w-24" />
      </div>
    </footer>
  );
};

export default NowPlaying;
