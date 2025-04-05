import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext.jsx";
import { usePlayer } from "../../context/PlayerContext.jsx";
import { usePlaylists } from "../../context/PlaylistContext.jsx";
import PlayButton from "../Controls/Buttons/PlayButton.jsx";
import HeartButton from "../Controls/Buttons/HeartButton.jsx";
import QueueButton from "../Controls/Buttons/QueueButton.jsx";
import PlaylistButton from "../Controls/Buttons/PlaylistButton.jsx";
import TrackPlaylistModal from "../Modals/TrackPlaylistModal.jsx";

const Track = ({ track, index, inSonglist = false, songlist = [] }) => {
  const { goToAlbumPage, goToLibraryPage } = useNavigation();
  const {
    isPlaying,
    currentTrack,
    play,
    pause,
    startSonglist,
    formatDuration,
    addToQueue,
    library,
  } = usePlayer();
  const { toggleLikedSong, isSongLiked } = usePlaylists();
  const albums = library.albums;
  const [showModal, setShowModal] = useState(false);
  const isCurrentTrack = currentTrack?.id === track.id;
  const album = track ? albums[track.albumId] : null;

  const handlePlay = () => {
    if (isCurrentTrack) {
      if (isPlaying) {
        pause();
      } else {
        play(track);
      }
    } else {
      if (inSonglist) {
        startSonglist(songlist, index);
      } else {
        play(track);
      }
    }
  };

  return (
    <div className="hover:bg-dark-bg3 flex h-14 items-center justify-between rounded px-2 py-2">
      <div className="flex h-full w-2/5 items-center gap-4">
        <span className="w-6 shrink-0 text-center text-sm">{index + 1}</span>
        <PlayButton
          track={track}
          isCurrentTrack={isCurrentTrack}
          isPlaying={isPlaying}
          handleClick={handlePlay}
        />
        <div className="flex flex-col overflow-hidden">
          <span
            className={`truncate font-medium ${isCurrentTrack ? "text-accent" : ""}`}
          >
            {track.title}
          </span>
          <span className="text-dark-fg2 text-sm">
            {Array.isArray(track.artists) &&
              track.artists.map((artist, index) => (
                <span
                  key={`${artist}-${index}`}
                  className="hover:text-dark-fg mr-1 cursor-pointer hover:underline"
                  onClick={() => goToLibraryPage(artist)}
                >
                  {artist}
                  {index < track.artists.length - 1 && ", "}
                </span>
              ))}
          </span>
        </div>
      </div>
      <div className="flex h-full w-3/10 justify-center overflow-hidden">
        <span
          onClick={() => album && goToAlbumPage(album)}
          className="text-dark-fg2 hover:text-dark-fg flex h-full cursor-pointer items-center truncate text-nowrap hover:underline"
        >
          {track.albumName}
        </span>
      </div>
      <div className="flex h-full w-3/10 items-center justify-end gap-8 pr-2">
        <HeartButton
          handleClick={() => toggleLikedSong(track.id)}
          isLiked={isSongLiked(track.id)}
        />
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
