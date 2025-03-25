import { useState } from "react";
import Album from "../Album/Album.jsx";
import libraryData from "../../data/library.json";

const Library = ({ onAlbumClick }) => {
  const [library] = useState(libraryData);
  const { albums } = library;

  const albumsByArtist = {};
  Object.values(albums).forEach((album) => {
    if (!albumsByArtist[album.albumArtist]) {
      albumsByArtist[album.albumArtist] = [];
    }
    albumsByArtist[album.albumArtist].push(album);
  });

  return (
    <div className="p-4">
      {Object.keys(albumsByArtist).map((artistName) => {
        const artistAlbums = albumsByArtist[artistName];

        return (
          <div key={artistName} className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">{artistName}</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {artistAlbums
                .sort((a, b) => {
                  const dateA = a.albumReleaseDate
                    ? new Date(a.albumReleaseDate)
                    : new Date(0);
                  const dateB = b.albumReleaseDate
                    ? new Date(b.albumReleaseDate)
                    : new Date(0);

                  return dateB - dateA || a.title.localeCompare(b.title);
                })
                .map((album) => {
                  return (
                    <Album
                      onAlbumClick={() => onAlbumClick(album)}
                      key={album.id}
                      onAlbumPage={false}
                      album={album}
                    />
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Library;
