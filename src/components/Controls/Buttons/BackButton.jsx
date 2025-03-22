import BackIcon from "../../../assets/svg/navigation/BackIcon.jsx";

const BackButton = ({ goBack }) => {
  return (
    <button
      onClick={goBack}
      className="group mb-6 flex items-center justify-center gap-2 text-blue-500 hover:underline"
    >
      <BackIcon /> Back
    </button>
  );
};

export default BackButton;
