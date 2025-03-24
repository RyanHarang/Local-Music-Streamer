import { usePlayer } from "../../../context/PlayerContext.jsx";
import TrashIcon from "../../../assets/svg/controls/TrashIcon.jsx";

const TrashButton = ({ index }) => {
  const { removeFromQueue } = usePlayer();
  return (
    <button
      onClick={() => {
        removeFromQueue(index);
      }}
      aria-label="Remove from queue"
      className="group cursor-pointer"
    >
      <TrashIcon />
    </button>
  );
};

export default TrashButton;
