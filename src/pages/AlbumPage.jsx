import { useState, useEffect } from "react";
import SongList from "../components/SongList/SongList.jsx";

const AlbumPage = ({ albumId }) => {
  const [album, setAlbum] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useState(null);

  // Mock fetching album data
  useEffect(() => {
    // You'd fetch from an API or context here
    const dummyAlbum = {
      id: albumId,
      title: "Album Title",
      artist: "Artist Name",
      cover: "/path/to/cover.jpg",
      tracks: [
        { id: 1, title: "Song One", artist: "Artist Name", duration: "3:45" },
        { id: 2, title: "Song Two", artist: "Artist Name", duration: "4:05" },
        // ...
      ],
    };

    setAlbum(dummyAlbum);
  }, [albumId]);

  const handlePlay = (track) => {
    setCurrentTrackId(track.id);
    // Your play logic goes here
    console.log(`Playing: ${track.title}`);
  };

  if (!album) {
    return <div>Loading album...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex gap-6">
        <img
          src={album.cover}
          alt={`${album.title} cover`}
          className="h-48 w-48 rounded object-cover shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{album.title}</h1>
          <p className="text-lg text-gray-500">{album.artist}</p>
          <button
            onClick={() => handlePlay(album.tracks[0])}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Play
          </button>
        </div>
      </div>

      <SongList
        tracks={album.tracks}
        currentTrackId={currentTrackId}
        onPlay={handlePlay}
      />
    </div>
  );
};

export default AlbumPage;
