import { usePlayer } from "../../context/PlayerContext.jsx";
import PlayButton from "./Buttons/PlayButton.jsx";
import SkipBackwardButton from "./Buttons/SkipBackwardButton.jsx";
import SkipForwardButton from "./Buttons/SkipForwardButton.jsx";
// import ShuffleIcon from "../../assets/svg/controls/ShuffleIcon.jsx";

const ButtonControls = () => {
  const { isPlaying, currentTrack, play, pause, skipNext, skipPrev } =
    usePlayer();
  const disabled = !currentTrack;

  return (
    <div className="flex items-center justify-center gap-4">
      <SkipBackwardButton skipPrev={skipPrev} disabled={disabled} />
      <PlayButton
        track={currentTrack}
        isCurrentTrack={true}
        isPlaying={isPlaying}
        handleClick={isPlaying ? () => pause() : () => play(currentTrack)}
        disabled={disabled}
      />
      <SkipForwardButton skipNext={skipNext} disabled={disabled} />
    </div>
  );
};

export default ButtonControls;
