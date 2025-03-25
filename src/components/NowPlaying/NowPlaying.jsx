import { usePlayer } from "../../context/PlayerContext.jsx";
import ButtonControls from "../Controls/ButtonControls.jsx";
import VolumeControls from "../Controls/VolumeControls.jsx";
import ProgressBar from "../Controls/ProgressBar.jsx";
import AudioPlayer from "../AudioPlayer/AudioPlayer.jsx";

const NowPlaying = () => {
  const { currentTrack } = usePlayer();
  return (
    <footer className="bg-light-bg2 dark:bg-dark-bg2 flex h-20 w-full items-center justify-between p-4">
      <div className="flex w-1/3 items-center gap-4">
        {currentTrack ? (
          <img
            src={currentTrack?.cover}
            alt={`Cover of ${currentTrack?.title}`}
            className="h-18 w-18 overflow-hidden rounded"
          />
        ) : (
          <div className="from-accent via-accent/70 h-18 w-18 overflow-hidden rounded bg-gradient-to-br to-black" />
        )}
        <div>
          <div className="text-sm font-semibold">
            {currentTrack?.title || "No track playing"}
          </div>
          <div className="text-xs">{currentTrack?.artist}</div>
        </div>
      </div>
      <div className="h-full w-1/3 flex-col items-center justify-center space-y-2">
        <ButtonControls />
        <ProgressBar />
        <AudioPlayer />
      </div>
      <VolumeControls />
    </footer>
  );
};

export default NowPlaying;
