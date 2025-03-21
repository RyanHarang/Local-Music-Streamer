import { usePlayer } from "../../context/PlayerContext.jsx";
import PlayButton from "./Buttons/PlayButton.jsx";
import SkipBackwardButton from "./Buttons/SkipBackwardButton.jsx";
import SkipForwardButton from "./Buttons/SkipForwardButton.jsx";
// import ShuffleIcon from "../../assets/svg/controls/ShuffleIcon.jsx";

const ButtonControls = () => {
  const { currentTrack } = usePlayer();
  const disabled = !currentTrack;

  return (
    <div className="flex gap-4">
      <SkipBackwardButton disabled={disabled} />
      <PlayButton track={currentTrack} disabled={disabled} />
      <SkipForwardButton disabled={disabled} />
    </div>
  );
};

export default ButtonControls;
