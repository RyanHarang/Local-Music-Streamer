import { usePlayer } from "../../context/PlayerContext.jsx";
import Songlist from "../Songlist/Songlist.jsx";
import libraryData from "../../data/library.json";

const Album = ({ album, onAlbumClick, onAlbumPage }) => {
  const { formatDuration } = usePlayer();
  const { tracks } = libraryData;
  const albumTracks = album.tracks
    .map((trackId) => tracks[trackId])
    .filter((track) => track);
  const sortedAlbumTracks = albumTracks.sort(
    (a, b) => a.trackNumber - b.trackNumber,
  );

  return (
    <div className="mb-6">
      <div
        onClick={() => onAlbumClick && onAlbumClick({ album })}
        className={`mb-4 flex items-center gap-4 ${!onAlbumPage && "group outline-accent cursor-pointer hover:outline"}`}
      >
        {album.cover && (
          <img
            src={album.cover}
            alt={`Cover of ${album.title}`}
            loading="lazy"
            className="h-32 w-32 rounded object-cover"
          />
        )}
        <div className="flex flex-col">
          <h3 className="group-hover:decoration-accent pb-2 text-xl font-semibold decoration-3 underline-offset-6 group-hover:underline">
            {album.title}
          </h3>
          <p className="text-sm text-gray-500">Tracks: {album.trackCount}</p>
          <p className="text-sm text-gray-500">
            Duration: {formatDuration(album.albumDuration)}
          </p>
          <p className="text-sm text-gray-500">
            Released: {album.albumReleaseDate}
          </p>
        </div>
      </div>

      {onAlbumPage && <Songlist tracks={sortedAlbumTracks} />}
    </div>
  );
};

export default Album;
