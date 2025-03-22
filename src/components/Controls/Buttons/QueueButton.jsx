import { usePlayer } from "../../../context/PlayerContext.jsx";
import QueueIcon from "../../../assets/svg/controls/QueueIcon.jsx";

const QueueButton = ({ track }) => {
  const { addToQueue } = usePlayer();
  return (
    <button
      onClick={() => addToQueue(track)}
      aria-label="Add to queue"
      className="group cursor-pointer"
    >
      <QueueIcon />
    </button>
  );
};

export default QueueButton;
