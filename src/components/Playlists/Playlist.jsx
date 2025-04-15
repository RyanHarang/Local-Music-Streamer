import { usePlayer } from "../../context/PlayerContext.jsx";
import { usePlaylists } from "../../context/PlaylistContext.jsx";
import Songlist from "../Songlist/Songlist.jsx";
import Loading from "../Loading/Loading.jsx";
import TrashButton from "../Controls/Buttons/TrashButton.jsx";

const Playlist = ({ playlist, onPlaylistClick, onPlaylistPage }) => {
  const { deletePlaylist } = usePlaylists();
  const { library, isShuffle, startSonglist } = usePlayer();
  const tracks = library.tracks;
  const playlistTracks = playlist.tracks
    .map((trackId) => tracks[trackId])
    .filter((track) => track);

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

  return (
    <div className="@container mb-4">
      <div
        onClick={() => {
          if (!playlist.isPending) onPlaylistClick && onPlaylistClick(playlist);
        }}
        className={`flex items-center gap-4 ${!onPlaylistPage && "group outline-accent cursor-pointer hover:outline"}`}
      >
        {playlist.cover && (
          <img
            src={playlist.cover}
            alt={`Cover of ${playlist.title}`}
            loading="lazy"
            className="h-32 w-32 rounded object-cover"
          />
        )}
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between pr-3 @lg:flex-col @lg:items-start @lg:justify-center @lg:pr-0">
            {playlist.isPending && <Loading />}
            <h3 className="group-hover:decoration-accent pb-2 text-xl font-semibold decoration-3 underline-offset-6 group-hover:underline">
              {playlist.name}
            </h3>
            <button
              onClick={(event) => handlePlay(event)}
              className="bg-accent hover:bg-accent/80 cursor-pointer rounded px-4 py-2 @lg:mb-2"
            >
              Play
            </button>
          </div>
          <p className="text-dark-fg3">Tracks: {playlist.trackCount}</p>
          <TrashButton handleClick={(e) => handleDelete(e, playlist.id)} />
        </div>
      </div>

      {onPlaylistPage && <Songlist tracks={playlistTracks} />}
    </div>
  );
};

export default Playlist;
