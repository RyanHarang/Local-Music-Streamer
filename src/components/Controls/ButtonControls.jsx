import { useState } from "react";
import PauseIcon from "../../assets/svg/controls/PauseIcon.jsx";
import PlayIcon from "../../assets/svg/controls/PlayIcon.jsx";
import SkipBackwardIcon from "../../assets/svg/controls/SkipBackwardIcon.jsx";
import SkipForwardIcon from "../../assets/svg/controls/SkipForwardIcon.jsx";
import ShuffleIcon from "../../assets/svg/controls/ShuffleIcon.jsx";

const ButtonControls = ({ onPlayPause, onNext, onPrev }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onPlayPause(!isPlaying); // Pass play/pause state to parent
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={onPrev}
        aria-label="Previous track"
        className="cursor-pointer"
      >
        <SkipBackwardIcon />
      </button>
      <button
        onClick={handlePlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="cursor-pointer"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        onClick={onNext}
        aria-label="Next track"
        className="cursor-pointer"
      >
        <SkipForwardIcon />
      </button>
    </div>
  );
};

export default ButtonControls;
