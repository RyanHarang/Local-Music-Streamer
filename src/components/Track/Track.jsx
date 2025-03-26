import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext.jsx";
import { usePlayer } from "../../context/PlayerContext.jsx";
import PlayButton from "../Controls/Buttons/PlayButton.jsx";
import QueueButton from "../Controls/Buttons/QueueButton.jsx";
import PlaylistButton from "../Controls/Buttons/PlaylistButton.jsx";
import TrackPlaylistModal from "../Modals/TrackPlaylistModal.jsx";
import libraryData from "../../data/library.json";

const Track = ({ track, index, inSonglist = false, songlist = [] }) => {
  const { goToAlbumPage } = useNavigation();
  const {
    isPlaying,
    currentTrack,
    play,
    pause,
    startSonglist,
    formatDuration,
    addToQueue,
  } = usePlayer();
  const { albums } = libraryData;
  const [showModal, setShowModal] = useState(false);
  const isCurrentTrack = currentTrack?.id === track.id;
  const album = track ? albums[track.albumId] : null;

  const handlePlay = () => {
    if (isCurrentTrack) {
      if (isPlaying) pause();
      else play(track);
    } else {
      if (inSonglist) startSonglist(songlist, index);
      else play(track);
    }
  };

  return (
    <div className="hover:bg-dark-bg3 flex items-center justify-between rounded px-4 py-2">
      <div className="flex w-2/5 items-center gap-4">
        <span className="w-6 text-center text-sm">{index + 1}</span>
        <PlayButton
          track={track}
          isCurrentTrack={isCurrentTrack}
          isPlaying={isPlaying}
          handleClick={handlePlay}
        />
        <div className="flex flex-col">
          <span
            className={`font-medium ${isCurrentTrack ? "text-accent" : ""}`}
          >
            {track.title}
          </span>
          <span className="text-dark-fg2 text-sm">
            {Array.isArray(track.artists)
              ? track.artists.join(", ")
              : track.artists}
          </span>
        </div>
      </div>
      <div className="align-center text-dark-fg2 flex max-w-2/5 truncate overflow-hidden">
        <span
          onClick={() => album && goToAlbumPage(album)}
          className="cursor-pointer text-nowrap hover:underline"
        >
          {track.albumName}
        </span>
      </div>
      <div className="flex w-1/5 items-center justify-end gap-8 text-sm">
        <QueueButton handleClick={() => addToQueue(track)} />
        <PlaylistButton handleClick={() => setShowModal(true)} />
        <span className="text-dark-fg2 w-6">
          {formatDuration(track.duration)}
        </span>
      </div>
      {showModal && (
        <TrackPlaylistModal
          track={track}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Track;
