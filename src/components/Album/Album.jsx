import { usePlayer } from "../../context/PlayerContext.jsx";
import Songlist from "../Songlist/Songlist.jsx";

const Album = ({ albumName, albumData, onAlbumClick, onAlbumPage }) => {
  const { formatDuration } = usePlayer();
  const { albumReleaseDate, tracks, cover } = albumData;
  return (
    <div className="mb-6">
      <div
        onClick={() => onAlbumClick && onAlbumClick({ albumName, albumData })}
        className={`mb-4 flex items-center gap-4 ${!onAlbumPage && "group outline-accent cursor-pointer hover:outline"}`}
      >
        {cover && (
          <img
            src={cover}
            alt={`Cover of ${albumName}`}
            loading="lazy"
            className="h-32 w-32 rounded object-cover"
          />
        )}
        <div className="flex flex-col">
          <h3 className="group-hover:decoration-accent pb-2 text-xl font-semibold decoration-3 underline-offset-6 group-hover:underline">
            {albumName}
          </h3>
          <p className="text-sm text-gray-500">
            Tracks: {albumData.trackCount}
          </p>
          <p className="text-sm text-gray-500">
            Duration: {formatDuration(albumData.albumDuration)}
          </p>
          <p className="text-sm text-gray-500">Released: {albumReleaseDate}</p>
        </div>
      </div>
      {onAlbumPage && <Songlist tracks={tracks} />}
    </div>
  );
};

export default Album;
