import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext.jsx";
import { usePlayer } from "../../context/PlayerContext.jsx";
import { usePlaylists } from "../../context/PlaylistContext.jsx";
import ButtonControls from "../Controls/ButtonControls.jsx";
import VolumeControls from "../Controls/VolumeControls.jsx";
import HeartButton from "../Controls/Buttons/HeartButton.jsx";
import ProgressBar from "../Controls/ProgressBar.jsx";
import AudioPlayer from "../AudioPlayer/AudioPlayer.jsx";
import NowPlayingModal from "../Modals/NowPlayingModal.jsx";

const NowPlaying = () => {
  const { goToAlbumPage, goToLibraryPage } = useNavigation();
  const { currentTrack, currentAlbum, currentCover } = usePlayer();
  const { toggleLikedSong, isSongLiked } = usePlaylists();
  const [showModal, setShowModal] = useState(false);

  return (
    <footer className="bg-dark-bg2 flex h-20 w-full items-center justify-between p-4">
      <div className="flex w-1/3 items-center gap-4">
        {currentTrack ? (
          <img
            onClick={() => setShowModal(true)}
            src={currentCover}
            alt={`Cover of ${currentTrack.title}`}
            className="h-18 w-18 cursor-pointer overflow-hidden rounded"
          />
        ) : (
          <div className="from-accent via-accent/70 h-18 w-18 overflow-hidden rounded bg-gradient-to-br to-black" />
        )}
        <div className="flex flex-col justify-center">
          <div
            onClick={() => currentAlbum && goToAlbumPage(currentAlbum)}
            className={`${currentAlbum && "cursor-pointer hover:underline"} text-xl font-semibold`}
          >
            {currentTrack?.title || "No track playing"}
          </div>
          <div className="text-md">
            {currentTrack &&
              Array.isArray(currentTrack.artists) &&
              currentTrack.artists.map((artist, index) => (
                <span
                  key={`${artist}-${index}`}
                  className="hover:text-dark-fg text-dark-fg2 mr-1 cursor-pointer hover:underline"
                  onClick={() => goToLibraryPage(artist)}
                >
                  {artist}
                  {index < currentTrack.artists.length - 1 && ", "}
                </span>
              ))}
          </div>
        </div>
        {currentTrack && (
          <HeartButton
            handleClick={() => toggleLikedSong(currentTrack.id)}
            isLiked={isSongLiked(currentTrack.id)}
          />
        )}
      </div>
      <div className="h-full w-1/3 flex-col items-center justify-center space-y-2">
        <ButtonControls />
        <ProgressBar />
        <AudioPlayer />
      </div>
      <VolumeControls />
      {showModal && <NowPlayingModal closeModal={() => setShowModal(false)} />}
    </footer>
  );
};

export default NowPlaying;
