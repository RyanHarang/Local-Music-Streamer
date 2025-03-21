import ButtonControls from "../Controls/ButtonControls.jsx";
import VolumeControls from "../Controls/VolumeControls.jsx";

const NowPlaying = () => {
  const handlePlayPause = (isPlaying) => {
    console.log(isPlaying ? "Playing" : "Paused");
    // You can use this to control your audio player (e.g., toggle play/pause)
  };

  const handleNext = () => {
    console.log("Next track");
    // Logic for skipping to the next track
  };

  const handlePrev = () => {
    console.log("Previous track");
    // Logic for skipping to the previous track
  };

  const handleVolumeChange = (volume) => {
    console.log(`Volume set to ${volume}`);
    // Logic to update the volume in your audio player
  };

  return (
    <footer className="flex h-20 items-center justify-between bg-gray-800 p-4">
      <div className="flex w-1/3 items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded bg-gray-600">
          {/* Album cover goes here */}
        </div>
        <div>
          <div className="text-sm font-semibold">Song Title</div>
          <div className="text-xs">Artist Name</div>
        </div>
      </div>
      <div className="flex w-1/3 items-center justify-center">
        <ButtonControls
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
      <VolumeControls onVolumeChange={handleVolumeChange} />
    </footer>
  );
};

export default NowPlaying;
