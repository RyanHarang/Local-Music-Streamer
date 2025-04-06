import BackIcon from "../../../assets/svg/navigation/BackIcon.jsx";

const BackButton = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="group text-accent mb-6 flex cursor-pointer items-center justify-center gap-2 hover:underline"
    >
      <BackIcon /> Back
    </button>
  );
};

export default BackButton;
