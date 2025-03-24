import { usePlayer } from "../../../context/PlayerContext.jsx";
import ShuffleIcon from "../../../assets/svg/controls/ShuffleIcon.jsx";

const ShuffleButton = () => {
  const { isShuffle, toggleShuffle } = usePlayer();
  return (
    <button
      onClick={toggleShuffle}
      aria-label="Toggle shuffle"
      className="group cursor-pointer"
    >
      <ShuffleIcon active={isShuffle} />
    </button>
  );
};

export default ShuffleButton;
