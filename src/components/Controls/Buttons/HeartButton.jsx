import HeartIcon from "../../../assets/svg/controls/HeartIcon.jsx";

const HeartButton = ({ isLiked, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      aria-label="Like track"
      className="group cursor-pointer"
    >
      <HeartIcon active={isLiked} />
    </button>
  );
};

export default HeartButton;
