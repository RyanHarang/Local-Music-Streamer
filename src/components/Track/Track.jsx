import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext.jsx";
import PlayButton from "../Controls/Buttons/PlayButton.jsx";
import QueueButton from "../Controls/Buttons/QueueButton.jsx";
import PlaylistButton from "../Controls/Buttons/PlaylistButton.jsx";
import TrackPlaylistModal from "../Modals/TrackPlaylistModal.jsx";

const Track = ({ track, index, inSonglist = false, songlist = [] }) => {
  const {
    isPlaying,
    currentTrack,
    play,
    pause,
    startSonglist,
    formatDuration,
    addToQueue,
  } = usePlayer();
  const [showModal, setShowModal] = useState(false);
  const isCurrentTrack = currentTrack?.id === track.id;

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
    <div className="dark:hover:bg-dark-bg3 hover:bg-light-bg2 flex cursor-pointer items-center justify-between rounded px-4 py-2">
      <div className="flex items-center gap-4">
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
          <span className="text-light-fg2 dark:text-dark-fg2 text-sm">
            {Array.isArray(track.artists)
              ? track.artists.join(", ")
              : track.artists}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-8 text-sm">
        <QueueButton handleClick={() => addToQueue(track)} />
        <PlaylistButton handleClick={() => setShowModal(true)} />
        <span className="text-light-fg2 dark:text-dark-fg2 w-6">
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
