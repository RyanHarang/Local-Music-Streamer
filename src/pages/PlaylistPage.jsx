import { useEffect, useState } from "react";
import { useNavigation } from "../context/NavigationContext.jsx";
import { usePlaylists } from "../context/PlaylistContext";
import Songlist from "../components/Songlist/Songlist.jsx";
import BackButton from "../components/Controls/Buttons/BackButton.jsx";
import libraryData from "../data/library.json";

const PlaylistPage = () => {
  const { selectedPlaylist, previousPage, goToPreviousPage, goToHomePage } =
    useNavigation();
  const { playlists, renamePlaylist } = usePlaylists();
  const [currentPlaylist, setCurrentPlaylist] = useState(selectedPlaylist);
  const [newName, setNewName] = useState(selectedPlaylist.name);
  const [isEditing, setIsEditing] = useState(false);
  const { tracks } = libraryData;

  useEffect(() => {
    setCurrentPlaylist(playlists.find((p) => p.id === selectedPlaylist.id));
  }, [playlists]);

  const playlistTracks = currentPlaylist.tracks
    .map((track) => {
      const fullTrack = tracks[track.id];
      return fullTrack ? { ...fullTrack, order: track.order } : null;
    })
    .filter(Boolean);

  const sortedPlaylistTracks = playlistTracks.sort((a, b) => a.order - b.order);

  const handleRename = async () => {
    if (newName.trim() && newName !== currentPlaylist.name) {
      await renamePlaylist(currentPlaylist.id, newName);
    }
    setIsEditing(false);
  };
  return (
    <div className="p-4">
      <BackButton goBack={previousPage ? goToPreviousPage : goToHomePage} />

      <div>
        {isEditing ? (
          <input
            className="border-b-2 border-gray-400 text-3xl font-bold focus:outline-none"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            autoFocus
          />
        ) : (
          <h1
            className="cursor-pointer text-3xl font-bold"
            onClick={() => setIsEditing(true)}
          >
            {currentPlaylist.name}
          </h1>
        )}
        <p className="text-gray-500">Tracks: {currentPlaylist.trackCount}</p>
      </div>

      <Songlist tracks={sortedPlaylistTracks} />
    </div>
  );
};

export default PlaylistPage;
