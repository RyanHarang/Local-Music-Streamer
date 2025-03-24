import PauseIcon from "../../../assets/svg/controls/PauseIcon.jsx";
import PlayIcon from "../../../assets/svg/controls/PlayIcon.jsx";

const PlayButton = ({
  track,
  isCurrentTrack,
  isPlaying,
  handleClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={handleClick}
      aria-label={isPlaying && isCurrentTrack ? "Pause" : "Play"}
      disabled={disabled}
      className={`${disabled ? "cursor-not-allowed opacity-50" : "group cursor-pointer"}`}
    >
      {track && isCurrentTrack && isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
};

export default PlayButton;
