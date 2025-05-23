import { usePlayer } from "../../context/PlayerContext.jsx";
import Songlist from "../Songlist/Songlist.jsx";
import StartSonglistButton from "../Controls/Buttons/StartSongListButton.jsx";

const Album = ({ album, onAlbumClick, onAlbumPage }) => {
  const { formatDuration, library } = usePlayer();
  const tracks = library.tracks;
  const albumTracks = album.tracks
    .map((trackId) => tracks[trackId])
    .filter((track) => track);
  const sortedAlbumTracks = albumTracks.sort(
    (a, b) => a.trackNumber - b.trackNumber,
  );

  return (
    <div className="@container mb-4">
      <div
        onClick={() => onAlbumClick && onAlbumClick({ album })}
        className={`flex items-center gap-4 ${!onAlbumPage && "group outline-accent cursor-pointer hover:outline"}`}
      >
        {album.cover && (
          <img
            src={album.cover}
            alt={`Cover of ${album.title}`}
            loading="lazy"
            className="h-32 w-32 rounded object-cover"
          />
        )}
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between pr-3 @xl:flex-col @xl:items-start @xl:justify-center @xl:pr-0">
            <h3 className="group-hover:decoration-accent text-xl font-semibold decoration-3 underline-offset-6 group-hover:underline">
              {album.title}
            </h3>
            <StartSonglistButton songlist={sortedAlbumTracks} />
          </div>
          <p className="text-dark-fg3">Tracks: {album.trackCount}</p>
          <p className="text-dark-fg3">
            Duration: {formatDuration(album.albumDuration)}
          </p>
          <p className="text-dark-fg3">Released: {album.albumReleaseDate}</p>
        </div>
      </div>

      {onAlbumPage && <Songlist tracks={sortedAlbumTracks} />}
    </div>
  );
};

export default Album;
