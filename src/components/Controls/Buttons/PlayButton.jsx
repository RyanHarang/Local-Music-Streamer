import { usePlayer } from "../../../context/PlayerContext.jsx";
import PauseIcon from "../../../assets/svg/controls/PauseIcon.jsx";
import PlayIcon from "../../../assets/svg/controls/PlayIcon.jsx";

const PlayButton = ({ track, disabled = false }) => {
  const { isPlaying, currentTrack, play, pause } = usePlayer();
  const isCurrentTrack = track && currentTrack?.id === track.id;

  const handleClick = () => {
    if (disabled) return;
    if (isPlaying && isCurrentTrack) {
      pause();
    } else {
      play(track);
    }
  };

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
