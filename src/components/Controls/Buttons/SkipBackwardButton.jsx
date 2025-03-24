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
      className={`${disabled ? "cursor-not-allowed opacity-50" : "group cursor-pointer"}`}
    >
      <SkipBackwardIcon />
    </button>
  );
};

export default SkipBackwardButton;
