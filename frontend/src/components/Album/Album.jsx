import Songlist from "../Songlist/Songlist.jsx";

const Album = ({ albumName, albumData, onAlbumClick, showTracks }) => {
  const { albumReleaseDate, tracks, cover } = albumData;
  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center gap-4">
        {cover && (
          <img
            src={cover}
            alt={`Cover of ${albumName}`}
            onClick={() =>
              onAlbumClick && onAlbumClick({ albumName, albumData })
            }
            className="h-32 w-32 cursor-pointer rounded object-cover"
          />
        )}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">{albumName}</h3>
          <p className="text-sm text-gray-500">Released: {albumReleaseDate}</p>
        </div>
      </div>
      {showTracks && <Songlist tracks={tracks} />}
    </div>
  );
};

export default Album;
