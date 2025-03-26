import { useEffect } from "react";
import { usePlayer } from "../../context/PlayerContext.jsx";
import PlayButton from "./Buttons/PlayButton.jsx";
import SkipBackwardButton from "./Buttons/SkipBackwardButton.jsx";
import SkipForwardButton from "./Buttons/SkipForwardButton.jsx";
import ShuffleButton from "./Buttons/ShuffleButton.jsx";
import RepeatButton from "./Buttons/RepeatButton.jsx";

const ButtonControls = () => {
  const { isPlaying, currentTrack, play, pause, skipNext, skipPrev } =
    usePlayer();
  const disabled = !currentTrack;

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;
      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement
      )
        return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          if (disabled) return;
          isPlaying ? pause() : play(currentTrack);
          break;
        case "ArrowRight":
          if (disabled) return;
          skipNext();
          break;
        case "ArrowLeft":
          if (disabled) return;
          skipPrev();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, currentTrack, play, pause, skipNext, skipPrev, disabled]);

  return (
    <div className="flex items-center justify-center gap-4">
      <ShuffleButton />
      <SkipBackwardButton skipPrev={skipPrev} disabled={disabled} />
      <PlayButton
        track={currentTrack}
        isCurrentTrack={true}
        isPlaying={isPlaying}
        handleClick={isPlaying ? () => pause() : () => play(currentTrack)}
        disabled={disabled}
      />
      <SkipForwardButton skipNext={skipNext} disabled={disabled} />
      <RepeatButton />
    </div>
  );
};

export default ButtonControls;
