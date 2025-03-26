import QueueIcon from "../../../assets/svg/controls/QueueIcon.jsx";

const QueueButton = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      aria-label="Add to queue"
      className="group cursor-pointer"
    >
      <QueueIcon />
    </button>
  );
};

export default QueueButton;
