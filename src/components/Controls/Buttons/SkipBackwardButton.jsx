import { usePlayer } from "../../../context/PlayerContext.jsx";
import SkipBackwardIcon from "../../../assets/svg/controls/SkipBackwardIcon.jsx";

const SkipBackwardButton = ({ disabled = false }) => {
  const { skipPrev } = usePlayer();

  const handleClick = () => {
    if (disabled) return;
    skipPrev();
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Previous track"
      className={`group cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <SkipBackwardIcon />
    </button>
  );
};

export default SkipBackwardButton;
