import Songlist from "../Songlist/Songlist.jsx";

const Album = ({ albumName, albumData, onAlbumClick, showTracks }) => {
  const { albumReleaseDate, tracks, cover } = albumData;
  return (
    <div className="mb-6">
      <div
        onClick={() => onAlbumClick && onAlbumClick({ albumName, albumData })}
        className="group mb-4 flex w-fit cursor-pointer items-center gap-4"
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
          <h3 className="group-hover:decoration-accent text-xl font-semibold decoration-3 underline-offset-6 group-hover:underline">
            {albumName}
          </h3>
          <p className="text-sm text-gray-500">Released: {albumReleaseDate}</p>
        </div>
      </div>
      {showTracks && <Songlist tracks={tracks} />}
    </div>
  );
};

export default Album;
