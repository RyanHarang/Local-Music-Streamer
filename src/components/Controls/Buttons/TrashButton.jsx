import TrashIcon from "../../../assets/svg/controls/TrashIcon.jsx";

const TrashButton = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      aria-label="Remove from queue"
      className="group cursor-pointer"
    >
      <TrashIcon />
    </button>
  );
};

export default TrashButton;
