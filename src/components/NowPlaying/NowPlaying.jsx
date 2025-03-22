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
        <div className="h-12 w-12 overflow-hidden rounded bg-gray-600">
          {/* Album cover goes here */}
        </div>
        <div>
          <div className="text-sm font-semibold">
            {currentTrack?.title || "No track playing"}
          </div>
          <div className="text-xs">{currentTrack?.artist}</div>
        </div>
      </div>
      <div className="w-1/3 flex-col items-center justify-center">
        <ButtonControls />
        <ProgressBar />
        <AudioPlayer />
      </div>
      <VolumeControls />
    </footer>
  );
};

export default NowPlaying;
