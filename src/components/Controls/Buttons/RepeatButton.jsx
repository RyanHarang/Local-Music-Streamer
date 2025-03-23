import { usePlayer } from "../../../context/PlayerContext.jsx";
import RepeatIcon from "../../../assets/svg/controls/RepeatIcon.jsx";

const RepeatButton = () => {
  const { isRepeat, toggleRepeat } = usePlayer();
  return (
    <button
      onClick={toggleRepeat}
      aria-label="Toggle Repeat"
      className="group cursor-pointer"
    >
      <RepeatIcon active={isRepeat} />
    </button>
  );
};

export default RepeatButton;
