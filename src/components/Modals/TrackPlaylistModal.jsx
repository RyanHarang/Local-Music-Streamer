import { useEffect, useRef, useState } from "react";
import { usePlaylists } from "../../context/PlaylistContext.jsx";

const TrackPlaylistModal = ({ track, closeModal }) => {
  const { playlists, addTrackToPlaylist, removeTrackFromPlaylist } =
    usePlaylists();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [initialPlaylists, setInitialPlaylists] = useState([]);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) dialogElement.showModal();

    const trackPlaylists = playlists
      .filter((playlist) => playlist.tracks.some((t) => t.id === track.id))
      .map((playlist) => playlist.id);

    setSelectedPlaylists(trackPlaylists);
    setInitialPlaylists(trackPlaylists);
  }, [closeModal, track, playlists]);

  const handleCheckboxChange = (playlistId) => {
    setSelectedPlaylists((prev) =>
      prev.includes(playlistId)
        ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId],
    );
  };

  const handleSubmit = () => {
    const toAdd = selectedPlaylists.filter(
      (id) => !initialPlaylists.includes(id),
    );
    const toRemove = initialPlaylists.filter(
      (id) => !selectedPlaylists.includes(id),
    );

    toAdd.forEach((playlistId) => addTrackToPlaylist(playlistId, track.id));
    toRemove.forEach((playlistId) =>
      removeTrackFromPlaylist(playlistId, track.id),
    );
    closeModal();
  };

  const hasChanges =
    selectedPlaylists.length !== initialPlaylists.length ||
    selectedPlaylists.some((id) => !initialPlaylists.includes(id)) ||
    initialPlaylists.some((id) => !selectedPlaylists.includes(id));

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className="bg-dark-bg text-dark-fg fixed z-50 m-auto w-11/12 max-w-md overflow-hidden rounded p-0 shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h3 className="mb-4 text-center text-2xl font-semibold">
          Select Playlists
        </h3>
        <p className="mb-4 text-center text-sm">
          Select the playlists to add or remove this track:
        </p>
        <div className="mb-6 flex max-h-64 flex-col justify-center space-y-4 overflow-y-auto">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="hover:bg-dark-bg3 flex items-center space-x-2 rounded-md p-2 transition-colors"
              >
                <input
                  type="checkbox"
                  id={`playlist-${playlist.id}`}
                  checked={selectedPlaylists.includes(playlist.id)}
                  onChange={() => handleCheckboxChange(playlist.id)}
                  className="checked:accent-accent text-accent focus:ring-accent h-5 w-5 cursor-pointer rounded focus:ring-2"
                />
                <label
                  htmlFor={`playlist-${playlist.id}`}
                  className="flex-1 cursor-pointer text-sm"
                >
                  {playlist.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-center">No playlists yet. Create one!</p>
          )}
        </div>
        <div className="flex justify-between border-t pt-4">
          <button
            onClick={handleSubmit}
            disabled={!hasChanges}
            className="bg-accent hover:bg-accent/80 disabled:hover:bg-accent rounded-md px-6 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save Changes
          </button>
          <button
            onClick={closeModal}
            className="rounded-md px-6 py-2 transition-colors hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default TrackPlaylistModal;
