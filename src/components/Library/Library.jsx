import { useEffect, useState } from "react";
import { useNavigation } from "../../context/NavigationContext.jsx";
import { usePlayer } from "../../context/PlayerContext.jsx";
import Album from "../Album/Album.jsx";
import Loading from "../Loading/Loading.jsx";

const Library = () => {
  const { goToAlbumPage, initialQuery, setInitialQuery } = useNavigation();
  const { library } = usePlayer();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchMode, setSearchMode] = useState("artist");
  const albums = library.albums;
  const albumsByArtist = {};

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  if (!library || !library.albums) {
    return <Loading />;
  }

  Object.values(albums).forEach((album) => {
    if (!albumsByArtist[album.albumArtist]) {
      albumsByArtist[album.albumArtist] = [];
    }
    albumsByArtist[album.albumArtist].push(album);
  });

  Object.keys(albumsByArtist).forEach((artist) => {
    albumsByArtist[artist].sort((a, b) => {
      const dateA = a.albumReleaseDate
        ? new Date(a.albumReleaseDate)
        : new Date(0);
      const dateB = b.albumReleaseDate
        ? new Date(b.albumReleaseDate)
        : new Date(0);
      return dateB - dateA || a.title.localeCompare(b.title);
    });
  });

  const filteredArtistsAndAlbums = Object.keys(albumsByArtist).reduce(
    (acc, artistName) => {
      const filteredAlbums = albumsByArtist[artistName].filter((album) => {
        if (searchQuery.trim() === "") {
          return true;
        }

        if (searchMode === "artist") {
          return artistName.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchMode === "album") {
          return album.title.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      });

      if (filteredAlbums.length > 0) {
        acc[artistName] = filteredAlbums;
      }
      return acc;
    },
    {}
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setInitialQuery(e.target.value);
  };

  return (
    <div className="px-4">
      <div className="bg-accent/70 sticky -top-4 mb-6 flex w-full items-center gap-4 rounded p-2 z-50">
        <input
          type="text"
          placeholder={`Search by ${searchMode}`}
          value={searchQuery}
          onChange={(e) => handleSearch(e)}
          className="focus:ring-accent w-4/5 rounded border p-2 focus:ring-4 focus:outline-none"
        />
        <button
          className="bg-accent hover:bg-accent/80 w-1/5 cursor-pointer rounded p-2"
          onClick={() =>
            setSearchMode(searchMode === "artist" ? "album" : "artist")
          }
        >
          Search by {searchMode === "artist" ? "Album" : "Artist"}
        </button>
      </div>
      {Object.entries(filteredArtistsAndAlbums).map(
        ([artistName, artistAlbums]) => (
          <div key={artistName} className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">{artistName}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {artistAlbums.map((album) => (
                <Album
                  onAlbumClick={() => goToAlbumPage(album)}
                  key={album.id}
                  onAlbumPage={false}
                  album={album}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Library;
