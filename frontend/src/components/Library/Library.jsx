import { useState } from "react";
import axios from "axios";
import Album from "../Album/Album.jsx";
import libraryData from "../../data/library.json";

const Library = ({ onAlbumClick }) => {
  const [library] = useState(libraryData);

  if (!library) return <div>Loading...</div>;
  return (
    <div className="p-4">
      {Object.keys(library).map((artistName) => {
        const artistData = library[artistName];

        return (
          <div key={artistName} className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">{artistName}</h2>

            {Object.keys(artistData)
              .sort((a, b) => {
                const albumA = artistData[a];
                const albumB = artistData[b];
                const yearA = parseInt(albumA.albumReleaseDate, 10);
                const yearB = parseInt(albumB.albumReleaseDate, 10);
                if (yearA !== yearB) return yearB - yearA;
                return a.localeCompare(b);
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
                    showTracks={false}
                    albumData={{
                      ...albumData,
                      tracks: sortedAlbumTracks,
                    }}
                  />
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Library;
