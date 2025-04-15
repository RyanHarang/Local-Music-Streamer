import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext.jsx";
import { usePlaylists } from "../../context/PlaylistContext.jsx";
import Songlist from "../Songlist/Songlist.jsx";
import Loading from "../Loading/Loading.jsx";
import TrashButton from "../Controls/Buttons/TrashButton.jsx";

const Playlist = ({ playlist, onPlaylistClick, onPlaylistPage }) => {
  const { deletePlaylist, renamePlaylist } = usePlaylists();
  const { library, isShuffle, startSonglist } = usePlayer();
  const [newName, setNewName] = useState(playlist.name);
  const [isEditing, setIsEditing] = useState(false);
  const tracks = library.tracks;
  const playlistTracks = playlist.tracks
    .map((track) => tracks[track.id])
    .filter((track) => track);
  const sortedPlaylistTracks = playlistTracks.sort((a, b) => a.order - b.order);

  const handlePlay = (event) => {
    event.stopPropagation();
    if (playlistTracks && playlistTracks.length > 0) {
      let index =
        isShuffle && playlistTracks.length > 1
          ? Math.floor(Math.random() * playlistTracks.length)
          : 0;
      startSonglist(playlistTracks, index);
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deletePlaylist(id);
  };

  const handleRename = async () => {
    if (newName.trim() && newName !== playlist.name) {
      await renamePlaylist(playlist.id, newName);
      playlist.name = newName;
    }
    setIsEditing(false);
  };

  return (
    <div className="@container relative mb-4">
      <div
        onClick={() => {
          if (!playlist.isPending) onPlaylistClick && onPlaylistClick(playlist);
        }}
        className={`flex items-center gap-4 ${!onPlaylistPage && "group outline-accent cursor-pointer hover:outline"}`}
      >
        {playlist.cover ? (
          <img
            src={playlist.cover}
            alt={`Cover of ${playlist.title}`}
            loading="lazy"
            className="h-32 w-32 rounded object-cover"
          />
        ) : (
          <div className="via-accent/40 to-accent aspect-square h-32 w-32 rounded bg-gradient-to-br from-black" />
        )}
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between pr-3 @xl:flex-col @xl:items-start @xl:justify-center @xl:pr-0">
            {playlist.isPending && <Loading />}
            {onPlaylistPage ? (
              <>
                {isEditing ? (
                  <input
                    className="border-dark-fg3 border-b-2 text-3xl font-bold focus:outline-none"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleRename}
                    onKeyDown={(e) => e.key === "Enter" && handleRename()}
                    autoFocus
                  />
                ) : (
                  <h1
                    className="cursor-pointer text-3xl font-bold"
                    onClick={() => setIsEditing(true)}
                  >
                    {playlist.name}
                  </h1>
                )}
              </>
            ) : (
              <h3 className="group-hover:decoration-accent pb-2 text-xl font-semibold decoration-3 underline-offset-6 group-hover:underline">
                {playlist.name}
              </h3>
            )}
            <button
              onClick={(event) => handlePlay(event)}
              className="bg-accent hover:bg-accent/80 cursor-pointer rounded px-4 py-2 @xl:mb-2"
            >
              Play
            </button>
          </div>
          <p className="text-dark-fg3">Tracks: {playlist.trackCount}</p>
        </div>
      </div>
      {!onPlaylistPage && (
        <div className="absolute top-1 left-1 aspect-square h-4 w-4">
          <TrashButton handleClick={(e) => handleDelete(e, playlist.id)} />
        </div>
      )}
      {onPlaylistPage && <Songlist tracks={sortedPlaylistTracks} />}
    </div>
  );
};

export default Playlist;
