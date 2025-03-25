import { useState } from "react";
import Album from "../Album/Album.jsx";
import libraryData from "../../data/library.json";

const Library = ({ onAlbumClick }) => {
  const [library] = useState(libraryData);
  return (
    <div className="p-4">
      {Object.keys(library).map((artistName) => {
        const artistData = library[artistName];

        return (
          <div key={artistName} className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">{artistName}</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {Object.keys(artistData)
                .sort((a, b) => {
                  const albumA = artistData[a];
                  const albumB = artistData[b];

                  const dateA = albumA.albumReleaseDate
                    ? new Date(albumA.albumReleaseDate)
                    : new Date(0);
                  const dateB = albumB.albumReleaseDate
                    ? new Date(albumB.albumReleaseDate)
                    : new Date(0);

                  return dateB - dateA || a.localeCompare(b);
                })
                .map((albumName) => {
                  const albumData = artistData[albumName];
                  const sortedAlbumTracks = albumData.tracks.sort(
                    (a, b) => a.trackNumber - b.trackNumber,
                  );
                  return (
                    <Album
                      onAlbumClick={onAlbumClick}
                      key={albumName}
                      albumName={albumName}
                      onAlbumPage={false}
                      albumData={{
                        ...albumData,
                        tracks: sortedAlbumTracks,
                      }}
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
