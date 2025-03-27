import { useState, useEffect, useRef } from "react";
import { usePlaylists } from "../../context/PlaylistContext.jsx";

const NewPlaylistModal = ({ closeModal }) => {
  const { createPlaylist } = usePlaylists();
  const [playlistName, setPlaylistName] = useState("");
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.showModal();
      inputRef.current?.focus();
    }
  }, [closeModal]);

  const handleSubmit = () => {
    if (playlistName.trim()) {
      createPlaylist(playlistName.trim());
      closeModal();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className="bg-dark-bg text-dark-fg fixed z-50 m-auto w-11/12 max-w-md overflow-hidden rounded p-0 shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h3 className="mb-4 text-center text-2xl font-semibold">
          Create Playlist
        </h3>
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter playlist name"
            className="focus:ring-accent w-full rounded border bg-gray-700 p-2 text-white focus:ring-4 focus:outline-none"
          />
        </div>

        <div className="flex justify-between border-t pt-4">
          <button
            onClick={handleSubmit}
            disabled={!playlistName.trim()}
            className="bg-accent hover:bg-accent/80 rounded-md px-6 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
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

export default NewPlaylistModal;
