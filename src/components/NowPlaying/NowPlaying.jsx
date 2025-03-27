import { useNavigation } from "../../context/NavigationContext.jsx";
import { usePlayer } from "../../context/PlayerContext.jsx";
import ButtonControls from "../Controls/ButtonControls.jsx";
import VolumeControls from "../Controls/VolumeControls.jsx";
import ProgressBar from "../Controls/ProgressBar.jsx";
import AudioPlayer from "../AudioPlayer/AudioPlayer.jsx";
import libraryData from "../../data/library.json";

const NowPlaying = () => {
  const { goToAlbumPage, goToLibraryPage } = useNavigation();
  const { currentTrack } = usePlayer();
  const { albums } = libraryData;
  const album = currentTrack ? albums[currentTrack.albumId] : null;
  const albumCover = album?.cover;

  return (
    <footer className="bg-dark-bg2 flex h-20 w-full items-center justify-between p-4">
      <div className="flex w-1/3 items-center gap-4">
        {currentTrack ? (
          <img
            src={albumCover}
            alt={`Cover of ${album?.title}`}
            className="h-18 w-18 overflow-hidden rounded"
          />
        ) : (
          <div className="from-accent via-accent/70 h-18 w-18 overflow-hidden rounded bg-gradient-to-br to-black" />
        )}
        <div>
          <div
            onClick={() => album && goToAlbumPage(album)}
            className={`${album && "cursor-pointer hover:underline"} text-lg font-semibold`}
          >
            {currentTrack?.title || "No track playing"}
          </div>
          <div className="text-md">
            {currentTrack &&
              Array.isArray(currentTrack.artists) &&
              currentTrack.artists.map((artist, index) => (
                <span
                  key={`${artist}-${index}`}
                  className="hover:text-dark-fg mr-1 cursor-pointer hover:underline"
                  onClick={() => goToLibraryPage(artist)}
                >
                  {artist}
                  {index < currentTrack.artists.length - 1 && ", "}
                </span>
              ))}
          </div>
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
