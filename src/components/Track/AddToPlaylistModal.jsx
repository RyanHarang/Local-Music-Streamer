import { useState, useEffect, useRef } from "react";
import { usePlaylists } from "../../context/PlaylistContext.jsx";

const AddTrackToPlaylistModal = ({ track, closeModal }) => {
  const { playlists, addTrackToPlaylist } = usePlaylists();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const dialogRef = useRef(null);

  const handleCheckboxChange = (playlistId) => {
    setSelectedPlaylists((prev) =>
      prev.includes(playlistId)
        ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId],
    );
  };

  const handleSubmit = () => {
    selectedPlaylists.forEach((playlistId) => {
      addTrackToPlaylist(playlistId, track.id);
    });
    closeModal();
  };

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) dialogElement.showModal();
  }, [closeModal]);

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className="dark:bg-dark-bg text-light-fg dark:text-dark-fg fixed z-50 m-auto w-11/12 max-w-md overflow-hidden rounded bg-white p-0 shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h3 className="mb-4 text-center text-2xl font-semibold">
          Select Playlists
        </h3>
        <p className="mb-4 text-center text-sm">
          Choose the playlists to which you want to add this track:
        </p>
        <div className="mb-6 flex max-h-64 flex-col justify-center space-y-4 overflow-y-auto">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <input
                  type="checkbox"
                  id={`playlist-${playlist.id}`}
                  checked={selectedPlaylists.includes(playlist.id)}
                  onChange={() => handleCheckboxChange(playlist.id)}
                  className="text-accent focus:ring-accent h-5 w-5 cursor-pointer rounded border-gray-300 focus:ring-2"
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
            disabled={selectedPlaylists.length === 0}
            className="bg-accent hover:bg-accent/80 disabled:hover:bg-accent rounded-md px-6 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add Track
          </button>
          <button
            onClick={closeModal}
            className="rounded-md px-6 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddTrackToPlaylistModal;
