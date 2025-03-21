import { usePlayer } from "../../../context/PlayerContext.jsx";
import SkipForwardIcon from "../../../assets/svg/controls/SkipForwardIcon.jsx";

const SkipForwardButton = ({ disabled = false }) => {
  const { skipNext } = usePlayer();

  const handleClick = () => {
    if (disabled) return;
    skipNext();
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Next track"
      className={`group cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <SkipForwardIcon />
    </button>
  );
};

export default SkipForwardButton;
