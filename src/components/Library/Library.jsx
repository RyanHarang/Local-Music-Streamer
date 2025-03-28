import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext.jsx";
import Album from "../Album/Album.jsx";
import libraryData from "../../data/library.json";

const Library = () => {
  const { goToAlbumPage, initialQuery } = useNavigation();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchMode, setSearchMode] = useState("artist");
  const { albums } = libraryData;

  const albumsByArtist = {};
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
        if (searchQuery.trim() === "") return true;

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
    {},
  );

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder={`Search by ${searchMode}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
        ),
      )}
    </div>
  );
};

export default Library;
