import BackIcon from "../../../assets/svg/navigation/BackIcon.jsx";

const BackButton = ({ goBack }) => {
  return (
    <button
      onClick={goBack}
      className="group text-accent mb-6 flex items-center justify-center gap-2 hover:underline"
    >
      <BackIcon /> Back
    </button>
  );
};

export default BackButton;
